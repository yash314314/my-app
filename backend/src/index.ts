import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Hono } from 'hono';
import { sign, verify } from 'hono/jwt'
import { cors } from 'hono/cors';
// Create the main Hono app
const app = new Hono<{
	Bindings: {
		DATABASE_URL: string,
	}
	Variables :{
		userid:string,
	}
}>();
interface EditorJSBlock {
	type: string;
	data: {
	  text?: string;
	  level?: number;
	  style?: string;
	  items?: string[];
	  caption?: string;
	  url?: string;
	  [key: string]: any;
	};
  }
  
  interface EditorJSData {
	blocks: EditorJSBlock[];
	version?: string;
	time?: number;
  }
  
  interface BlogPost {
	title: string;
	content: EditorJSData;
	category: string;
  } //n
app.use('/*', cors())
app.post("/", async (c) => {
	return c.json("server is up and running")
})
app.use("/api/v1/blog/*", async (c, next) => {
	const header = c.req.header("Authorization") || "";
	// Verify the JWT token using the secret key
	const response = await verify(header, "JWT_SECRET");
	// If verification succeeds
	if (response) {
	  // Make sure response.id is of type string
	  if (typeof response.id === "string") {
		c.set("userid", response.id); // Now this is safely a string
		await next();
	  } else {
		// Handle the case where id is not a string
		c.status(400);
		return c.json("Invalid user ID");
	  }
	}
	// If verification fails
	else {
	  c.status(403);
	  return c.json("Unauthorized");
	}
  });

app.post('/api/v1/signup', async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl:"prisma://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiMjcwM2VmZmUtYWM3Yi00MGYyLWE3ZjctOWFhMWJlMzE2ODUwIiwidGVuYW50X2lkIjoiNTNkOWJhYTIxMDBiOTA3MDAwODNkOTQxYzI1NmFjNDliZGJiNDg1MjhmNzdjNzQ4NzI5OTgwMzc1YjZkMWU4MCIsImludGVybmFsX3NlY3JldCI6IjAzNGU4MzE5LTA3ZTktNDk0YS1iMzgyLTAxNTI0Y2MyZGJkMSJ9.4aBcihsqWUz2vBNN9jO6pVdS22DiX8HpcVYRu8-F7TI"	,
	}).$extends(withAccelerate());

	const body = await c.req.json();
	try {
		//ts
		const user = await prisma.user.create({
			data: {
				email: body.email,
				password: body.password,
				name: body.username,
			}
		});
		const jwt = await sign({ id: user.id }, "JWT_SECRET");
		return c.json({ jwt });
	} catch(e) {
		console.log(e);
		c.status(403);
		return c.json({ error: "error while signing up" });
	}
})
app.post('/api/v1/signin', async(c) => {
	const prisma = new PrismaClient({
		datasourceUrl:"prisma://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiMjcwM2VmZmUtYWM3Yi00MGYyLWE3ZjctOWFhMWJlMzE2ODUwIiwidGVuYW50X2lkIjoiNTNkOWJhYTIxMDBiOTA3MDAwODNkOTQxYzI1NmFjNDliZGJiNDg1MjhmNzdjNzQ4NzI5OTgwMzc1YjZkMWU4MCIsImludGVybmFsX3NlY3JldCI6IjAzNGU4MzE5LTA3ZTktNDk0YS1iMzgyLTAxNTI0Y2MyZGJkMSJ9.4aBcihsqWUz2vBNN9jO6pVdS22DiX8HpcVYRu8-F7TI"	,
	}).$extends(withAccelerate());
	
	const body = await c.req.json();
	const user = await prisma.user.findUnique({
		where: {
			email: body.email,
			password: body.password,
		}
	});

	if (!user) {
		c.status(403);
		return c.json({ error: "user not found" });
	}

	const jwt = await sign({ id: user.id }, "JWT_SECRET");
	return c.json({ jwt });
})
app.get('/api/v1/blog/my' , async(c) => {
	const prisma = new PrismaClient({
		datasourceUrl:"prisma://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiMjcwM2VmZmUtYWM3Yi00MGYyLWE3ZjctOWFhMWJlMzE2ODUwIiwidGVuYW50X2lkIjoiNTNkOWJhYTIxMDBiOTA3MDAwODNkOTQxYzI1NmFjNDliZGJiNDg1MjhmNzdjNzQ4NzI5OTgwMzc1YjZkMWU4MCIsImludGVybmFsX3NlY3JldCI6IjAzNGU4MzE5LTA3ZTktNDk0YS1iMzgyLTAxNTI0Y2MyZGJkMSJ9.4aBcihsqWUz2vBNN9jO6pVdS22DiX8HpcVYRu8-F7TI"	,
	}).$extends(withAccelerate());
	const userid = c.get("userid");
	const post = await prisma.post.findMany({
		where: {
			authorId: userid
		},
		select: {
			id: true,
			author: {
				select:{
					name: true,
				}
			},
			title	: true,
			content : true,
			timestamp : true,
		}
	});
    console.log(post);
	return c.json(post);
})
app.delete("/api/v1/blog/:id" , async(c) => {
	const id = c.req.param('id')
	const prisma = new PrismaClient({
		
		datasourceUrl:"prisma://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiMjcwM2VmZmUtYWM3Yi00MGYyLWE3ZjctOWFhMWJlMzE2ODUwIiwidGVuYW50X2lkIjoiNTNkOWJhYTIxMDBiOTA3MDAwODNkOTQxYzI1NmFjNDliZGJiNDg1MjhmNzdjNzQ4NzI5OTgwMzc1YjZkMWU4MCIsImludGVybmFsX3NlY3JldCI6IjAzNGU4MzE5LTA3ZTktNDk0YS1iMzgyLTAxNTI0Y2MyZGJkMSJ9.4aBcihsqWUz2vBNN9jO6pVdS22DiX8HpcVYRu8-F7TI"	,
	}).$extends(withAccelerate());
	const post = await prisma.post.delete({
		where: {
			id 
		}
	});
	return c.json("deleted successfully");
})
app.get('/api/v1/blog/bulk', async(c) => {
	const prisma = new PrismaClient({
		
		datasourceUrl:"prisma://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiMjcwM2VmZmUtYWM3Yi00MGYyLWE3ZjctOWFhMWJlMzE2ODUwIiwidGVuYW50X2lkIjoiNTNkOWJhYTIxMDBiOTA3MDAwODNkOTQxYzI1NmFjNDliZGJiNDg1MjhmNzdjNzQ4NzI5OTgwMzc1YjZkMWU4MCIsImludGVybmFsX3NlY3JldCI6IjAzNGU4MzE5LTA3ZTktNDk0YS1iMzgyLTAxNTI0Y2MyZGJkMSJ9.4aBcihsqWUz2vBNN9jO6pVdS22DiX8HpcVYRu8-F7TI"	,
	}).$extends(withAccelerate());
	const post = await prisma.post.findMany({
		select: {
			id: true,
			title: true,
			content: true,
			author: {
				select: {
					name: true,
				}
			},
			timestamp: true,
		}
	});

	return c.json(post);
})
app.get('/api/v1/blog/:id', async(c) => {
	const id = c.req.param('id')
	const prisma = new PrismaClient({
		datasourceUrl:"prisma://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiMjcwM2VmZmUtYWM3Yi00MGYyLWE3ZjctOWFhMWJlMzE2ODUwIiwidGVuYW50X2lkIjoiNTNkOWJhYTIxMDBiOTA3MDAwODNkOTQxYzI1NmFjNDliZGJiNDg1MjhmNzdjNzQ4NzI5OTgwMzc1YjZkMWU4MCIsImludGVybmFsX3NlY3JldCI6IjAzNGU4MzE5LTA3ZTktNDk0YS1iMzgyLTAxNTI0Y2MyZGJkMSJ9.4aBcihsqWUz2vBNN9jO6pVdS22DiX8HpcVYRu8-F7TI"	,
	}).$extends(withAccelerate());
	const post = await prisma.post.findUnique({
		where: {
			id
		},
		select: {
			id: true,
			author: {
				select:{
					name: true,
				}
			},
			title	: true,
			content : true,
			timestamp : true,
		}
	});

	return c.json(post);
})

app.post('/api/v1/blog', async(c) => {
	const userid = c.get("userid");
	const prisma = new PrismaClient({
		datasourceUrl:"prisma://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiMjcwM2VmZmUtYWM3Yi00MGYyLWE3ZjctOWFhMWJlMzE2ODUwIiwidGVuYW50X2lkIjoiNTNkOWJhYTIxMDBiOTA3MDAwODNkOTQxYzI1NmFjNDliZGJiNDg1MjhmNzdjNzQ4NzI5OTgwMzc1YjZkMWU4MCIsImludGVybmFsX3NlY3JldCI6IjAzNGU4MzE5LTA3ZTktNDk0YS1iMzgyLTAxNTI0Y2MyZGJkMSJ9.4aBcihsqWUz2vBNN9jO6pVdS22DiX8HpcVYRu8-F7TI"	,
	}).$extends(withAccelerate());
	try{
   const body = await c.req.json() as BlogPost;
   const today = new Date();
   if (!body.content || !Array.isArray(body.content.blocks)) {
	return c.json({ error: 'Invalid content structure' }, 400);
  }
   // Format the timestamp
   const timestamp = `${today.getDate()} ${today.toLocaleString('default', { month: 'long' })} ${today.getFullYear()}`;
   
   const post = await prisma.post.create({
	data: {
		title: body.title,
		content: body.content,
		authorId: userid,
		timestamp: timestamp,
	}
   });c.status(200);
   return c.json({
	id: post.id
});
	}
	catch(e){
console.log(e);
	}

})
////update the given token
app.put('/api/v1/blog', async(c) => {
	const userid = c.get("userid");
	const prisma = new PrismaClient({
		datasourceUrl:"prisma://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiMjcwM2VmZmUtYWM3Yi00MGYyLWE3ZjctOWFhMWJlMzE2ODUwIiwidGVuYW50X2lkIjoiNTNkOWJhYTIxMDBiOTA3MDAwODNkOTQxYzI1NmFjNDliZGJiNDg1MjhmNzdjNzQ4NzI5OTgwMzc1YjZkMWU4MCIsImludGVybmFsX3NlY3JldCI6IjAzNGU4MzE5LTA3ZTktNDk0YS1iMzgyLTAxNTI0Y2MyZGJkMSJ9.4aBcihsqWUz2vBNN9jO6pVdS22DiX8HpcVYRu8-F7TI"	,
	}).$extends(withAccelerate());
	const body = await c.req.json();
	prisma.post.update({
		where: {
			id: body.id,
			authorId: userid
		},
		data: {
			title: body.title,
			content: body.content
		}
	});

	return c.text('updated post');
})

export default app;