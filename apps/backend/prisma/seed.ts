import { PrismaClient } from '../src/generated/prisma';

const prisma = new PrismaClient();

async function main() {

    await prisma.event.deleteMany();

    await prisma.event.createMany({
        data: [
            {
                title: 'Tech Conference 2025',
                description: 'A conference about the latest in tech innovation.',
                date: new Date('2025-12-15'),
                location: 'Winnipeg Convention Centre',
            },
            {
                title: 'Music Festival',
                description: 'Outdoor event with live bands and food trucks.',
                date: new Date('2025-08-20'),
                location: 'The Forks',
            },
            {
                title: 'Art Exhibition',
                description: 'Local artists showcase their work.',
                date: new Date('2025-06-05'),
                location: 'Winnipeg Art Gallery',
            },
        ],
    });

    console.log('Seed data inserted successfully!');
}

main()
    .catch((error) => {
        console.error('Error seeding data:', error);   
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
