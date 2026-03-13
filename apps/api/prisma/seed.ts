import * as dotenv from 'dotenv';
dotenv.config();

import { PrismaClient } from './generated/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = process.env.DATABASE_URL || '';
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter } as any);

async function main() {
  console.log('Seeding activities...');

  const activities = [
    {
      title: 'Zakat & Zakat-ul-fitr',
      description: 'Purify your wealth and fulfill your religious duty. We manage Zakat distribution with 100% transparency, ensuring funds reach only those strictly eligible under Sharia guidelines in the most impoverished regions.',
      image: '/images/IMG_8983 2.jpg',
      slug: 'zakat',
      isCampaign: true,
    },
    {
      title: 'Eid Clothing',
      description: 'Celebrate the joy of Eid by gifting new clothes to orphans and vulnerable children. Every child deserves to feel beautiful and valued during our most sacred festivals.',
      image: '/images/10.jpg',
      slug: 'eid-clothing',
      isCampaign: true,
    },
    {
      title: 'Mina Iftar Table',
      description: 'Our community Iftar tables serve thousands of fasting individuals. We focus on providing nutritious, hot meals to orphans and families who struggle to find Suhoor and Iftar every day.',
      image: '/images/.jpg',
      slug: 'mina-iftar',
      isCampaign: true,
    },
    {
      title: 'Water Well',
      description: 'Water is the source of life. We construct solar-powered and hand-pumped wells in remote villages, ensuring permanent access to clean drinking water and stopping the spread of diseases.',
      image: '/images/7.jpg',
      slug: 'water-well',
      isCampaign: false,
    },
    {
      title: 'Masjid & Madrasa',
      description: 'We build durable, high-capacity Mosques that serve as the spiritual and educational heart of the community, providing a safe space for prayer and traditional education for children.',
      image: '/assets/MASJID/DJI_20250902124328_0005_D.JPG',
      slug: 'masjid',
      isCampaign: false,
    },
    {
      title: 'Cataract Surgery',
      description: 'In just 30 minutes, we can restore a person\'s sight. Our specialized surgical camps provide free cataract procedures to the elderly, helping them regain their independence and quality of life.',
      image: '/assets/KATARAKT/JQ0G4907_1.JPG',
      slug: 'cataract',
      isCampaign: false,
      goalAmount: 75,
    },
    {
      title: 'Emergency Relief',
      description: 'Responding to urgent crises, floods, and droughts. We provide direct food aid, medicine, and emergency shelter to families facing immediate life-threatening situations across Tanzania.',
      image: '/images/IMG_5852.jpg',
      slug: 'emergency-relief',
      isCampaign: false,
    },
    {
      title: 'Orphan Sponsorship',
      description: 'Change a life forever. Your sponsorship provides a child with education, healthcare, nutrition, and home support, ensuring they have the foundation to build a successful future.',
      image: '/images/15.jpg',
      slug: 'orphan-sponsorship',
      isCampaign: false,
    },
    {
      title: 'Ramadan Relief',
      description: 'Providing Suhoor and Iftar food packages to impoverished families throughout the holy month of Ramadan.',
      image: '/images/IMG_9003 2.jpg',
      slug: 'ramadan-relief',
      isCampaign: true,
    }
  ];

  for (const activity of activities) {
    await prisma.activity.upsert({
      where: { slug: activity.slug },
      update: activity,
      create: activity,
    });
  }

  console.log('Seeding completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
