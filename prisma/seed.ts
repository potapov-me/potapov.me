import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

async function main() {
  const projectsPath = path.join(__dirname, '../data/projects.json');
  const timelinePath = path.join(__dirname, '../data/timeline.json');

  const projectsData = JSON.parse(fs.readFileSync(projectsPath, 'utf-8'));
  const timelineData = JSON.parse(fs.readFileSync(timelinePath, 'utf-8'));

  for (const project of projectsData) {
    await prisma.project.create({
      data: {
        name: project.name,
        description: project.description,
        stack: project.stack,
        url: project.url,
        repo: project.repo,
        icon: 'default-icon.svg', // Provide a default icon
      },
    });
  }

  for (const item of timelineData) {
    await prisma.timelineItem.create({
      data: {
        year: item.year,
        title: item.title,
        description: item.description,
        lessons: item.lessons,
        isBlink: item.isBlink,
        isStartup: item.isStartup,
        link: item.link,
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
