// lib/prisma.ts

import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export async function seedDemoData() {
  try {
    const userCount = await prisma.user.count();
    if (userCount > 0) {
      console.log("Demo data already exists, skipping seed");
      return;
    }

    console.log("🌱 Seeding users...");

    const alice = await prisma.user.create({
      data: {
        name: "Alice Smith",
        email: "alice@example.com",
        password: "password123",
      },
    });

    const bob = await prisma.user.create({
      data: {
        name: "Bob Johnson",
        email: "bob@example.com",
        password: "password123",
      },
    });

    console.log("🌱 Seeding JavaScript room...");

    const jsRoom = await prisma.room.create({
      data: {
        name: "JavaScript Project",
        creatorId: alice.id,
        allowAudio: true,
        allowVideo: true,
        allowText: true,
        participants: {
          create: [{ userId: alice.id }, { userId: bob.id }],
        },
        messages: {
          create: [
            {
              content: "Welcome to the JavaScript project room!",
              userId: alice.id,
            },
            {
              content: "I'm working on the authentication module.",
              userId: alice.id,
            },
            {
              content: "I'll handle the UI components.",
              userId: bob.id,
            },
          ],
        },
        files: {
          create: [
            {
              name: "main.js",
              content: `// Write your code here
function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet("World"));`,
              language: "javascript",
            },
            {
              name: "index.html",
              content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>JavaScript Project</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div id="app"></div>
  <script src="main.js"></script>
</body>
</html>`,
              language: "html",
            },
            {
              name: "styles.css",
              content: `body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 20px;
}

#app {
  max-width: 800px;
  margin: 0 auto;
}`,
              language: "css",
            },
            {
              name: "components",
              isFolder: true,
            },
          ],
        },
      },
    });

    const componentsFolder = await prisma.file.findFirst({
      where: {
        roomId: jsRoom.id,
        name: "components",
        isFolder: true,
      },
    });

    if (!componentsFolder) throw new Error("Components folder not found");

    console.log("🌱 Seeding component files...");

    await prisma.file.createMany({
      data: [
        {
          name: "Button.js",
          content: `class Button {
  constructor(text, onClick) {
    this.text = text;
    this.onClick = onClick;
  }

  render() {
    const button = document.createElement('button');
    button.textContent = this.text;
    button.addEventListener('click', this.onClick);
    return button;
  }
}

export default Button;`,
          language: "javascript",
          roomId: jsRoom.id,
          parentId: componentsFolder.id,
        },
        {
          name: "Card.js",
          content: `class Card {
  constructor(title, content) {
    this.title = title;
    this.content = content;
  }

  render() {
    const card = document.createElement('div');
    card.className = 'card';

    const titleEl = document.createElement('h2');
    titleEl.textContent = this.title;

    const contentEl = document.createElement('div');
    contentEl.textContent = this.content;

    card.appendChild(titleEl);
    card.appendChild(contentEl);

    return card;
  }
}

export default Card;`,
          language: "javascript",
          roomId: jsRoom.id,
          parentId: componentsFolder.id,
        },
      ],
    });

    console.log("🌱 Seeding Python room...");

    await prisma.room.create({
      data: {
        name: "Python Algorithm",
        creatorId: bob.id,
        allowAudio: true,
        allowVideo: true,
        allowText: true,
        participants: {
          create: [{ userId: bob.id }, { userId: alice.id }],
        },
        files: {
          create: [
            {
              name: "main.py",
              content: `def fibonacci(n):
    """Generate the Fibonacci sequence up to n."""
    a, b = 0, 1
    result = []
    while a < n:
        result.append(a)
        a, b = b, a + b
    return result

print(fibonacci(100))`,
              language: "python",
            },
            {
              name: "sort.py",
              content: `def bubble_sort(arr):
    """Implement bubble sort algorithm."""
    n = len(arr)
    for i in range(n):
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr

test_array = [64, 34, 25, 12, 22, 11, 90]
print(f"Original array: {test_array}")
print(f"Sorted array: {bubble_sort(test_array.copy())}")`,
              language: "python",
            },
          ],
        },
      },
    });

    console.log("✅ Demo data seeded successfully");
  } catch (error) {
    console.error("❌ Error seeding demo data:", error);
    throw error;
  }
}
