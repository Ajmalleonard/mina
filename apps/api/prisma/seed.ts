import * as dotenv from 'dotenv';
dotenv.config();

import { PrismaClient } from './generated/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import * as bcrypt from 'bcrypt';

const connectionString = process.env.DATABASE_URL || '';
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter } as any);

async function main() {
  console.log('Seeding activities with Tanzania-related charity packages...');
  const adminOnlySeed = process.env.ADMIN_ONLY_SEED === '1';

  const activities: any[] = [
  // 1. PROMOTIONS
    {
      title: "Promotional Support",
      description: "Support our outreach and awareness campaigns so we can reach more donors and assist more vulnerable families across Tanzania.",
      image: "/images/hands.jpg",
      slug: "promotions-general",
      category: "PROMOTIONS",
      priority: 10,
      type: "DONATION",
      price: null,
    },


    {
      title: "Emergency Aid",
      description: "Support urgent relief efforts for families affected by crisis, disaster, or hardship. Donations to this fund are pooled to provide emergency food, clean water, shelter, medical support, and other essential supplies to communities in greatest need.",
      image: "https://sni-prod.s3.eu-north-1.amazonaws.com/mina-cdn/emergency.avif",
      slug: "emergency-aid",
      category: "EMERGENCY_AID",
      priority: 21,
      type: "DONATION",
      price: null,
    },
    {
      title: "Flood Relief Tanzania",
      description: "Help families affected by floods in Tanzania with emergency food, clean water, blankets, and temporary shelter.",
      image: "https://sni-prod.s3.eu-north-1.amazonaws.com/mina-cdn/1774370135812-emergency.webp",
      slug: "flood-relief-tanzania",
      category: "EMERGENCY_AID",
      priority: 22,
      type: "DONATION",
      price: null,
    },


    // 3. RAMADAN CAMPAIGN
    {
      title: "Iftar for Orphans",
      description: "For just €3, you can provide a warm iftar meal to an orphan during Ramadan. Your donation helps bring nourishment, care, and comfort at the time of breaking the fast.",
      image: "https://sni-prod.s3.eu-north-1.amazonaws.com/mina-cdn/iftar.jpg",
      slug: "iftar-donation",
      category: "RAMADAN_CAMPAIGN",
      priority: 30,
      type: "FIXED_PRICE",
      price: 3.00,
    },
    {
      title: "Ramadan Food Package",
      description: "Support a vulnerable family this Ramadan with a complete food package filled with essential supplies. Your donation helps provide nutritious meals, relieves hardship, and brings comfort and dignity to the table during the blessed month.",
      image: "https://sni-prod.s3.eu-north-1.amazonaws.com/mina-cdn/food_package.jpg",
      slug: "food-package-ramadan",
      category: "RAMADAN_CAMPAIGN",
      priority: 31,
      type: "FIXED_PRICE",
      price: 30.00,
    },
    {
      title: "Zakat-ul-Fitr",
      description: "Help meet the basic needs of those in need through your Fitrah donations before Eid.",
      image: "/images/hands.jpg",
      slug: "zakat-ul-fitr",
      category: "RAMADAN_CAMPAIGN",
      priority: 32,
      type: "FIXED_PRICE",
      price: 13.00,
    },
    {
      title: "Suhoor Support Package",
      description: "Help provide basic suhoor supplies for vulnerable families so they can prepare meals before dawn during Ramadan.",
      image: "/images/meals.jpg",
      slug: "suhoor-support-package",
      category: "RAMADAN_CAMPAIGN",
      priority: 33,
      type: "FIXED_PRICE",
      price: 15.00,
    },
    {
      title: "Eid Food Basket",
      description: "Help a struggling family celebrate Eid with dignity by providing a special food basket after Ramadan.",
      image: "/images/meals.jpg",
      slug: "eid-food-basket",
      category: "RAMADAN_CAMPAIGN",
      priority: 34,
      type: "FIXED_PRICE",
      price: 35.00,
    },

    // 4. NAFL OFFERING
    {
      title: "Aqiqah Sacrifice Tanzania",
      description: "Fulfill your Aqiqah in Tanzania and help provide fresh meat to poor families, orphans, and madrasa students.",
      image: "/images/meals.jpg",
      slug: "aqiqah-sacrifice-tanzania",
      category: "NAFL_OFFERING",
      priority: 40,
      type: "FIXED_PRICE",
      price: 140.00,
    },
    {
      title: "Sadaqah Sacrifice Tanzania",
      description: "Donate a voluntary sacrifice in Tanzania and share meat with families in need, especially in rural communities.",
      image: "/images/hands.jpg",
      slug: "sadaqah-sacrifice-tanzania",
      category: "NAFL_OFFERING",
      priority: 41,
      type: "FIXED_PRICE",
      price: 120.00,
    },
    {
      title: "Shukr Sacrifice Tanzania",
      description: "Express gratitude through a Shukr sacrifice and support vulnerable households with nutritious meat.",
      image: "/images/meals.jpg",
      slug: "shukr-sacrifice-tanzania",
      category: "NAFL_OFFERING",
      priority: 42,
      type: "FIXED_PRICE",
      price: 120.00,
    },

    // 5. WEFA MEAL
    {
      title: "Dinner for Orphans",
      description: "You can make our children happy by providing a nutritious meal at orphanages and madrasas in Tanzania.",
      image: "/images/meals.jpg",
      slug: "dinner-for-orphans",
      category: "MINA_MEAL",
      priority: 50,
      type: "FIXED_PRICE",
      price: 150.00,
    },
    {
      title: "Hot Meal for Street Children",
      description: "Provide a hot cooked meal for vulnerable children living in difficult conditions.",
      image: "/images/meals.jpg",
      slug: "hot-meal-street-children",
      category: "MINA_MEAL",
      priority: 51,
      type: "FIXED_PRICE",
      price: 5.00,
    },
    {
      title: "Community Feeding Program",
      description: "Support a community meal program for the elderly, widows, children, and families facing hunger.",
      image: "/images/meals.jpg",
      slug: "community-feeding-program",
      category: "MINA_MEAL",
      priority: 52,
      type: "DONATION",
      price: null,
    },

    // 6. ORPHAN
    {
      title: "Orphan Sponsorship",
      description: "With a monthly sum of 35 euros, you can cover the primary basic needs of an orphan child, including shelter, education, and healthcare.",
      image: "/images/children.jpg",
      slug: "orphan-sponsorship",
      category: "ORPHAN",
      priority: 60,
      type: "FIXED_PRICE",
      price: 35.00,
    },
    {
      title: "School Uniform for an Orphan",
      description: "Provide a school uniform for an orphaned child and help them attend school with dignity and confidence.",
      image: "/images/children.jpg",
      slug: "school-uniform-orphan",
      category: "ORPHAN",
      priority: 61,
      type: "FIXED_PRICE",
      price: 20.00,
    },
    {
      title: "School Supplies for an Orphan",
      description: "Help an orphan child with exercise books, pens, a school bag, and other essential learning materials.",
      image: "/images/children.jpg",
      slug: "school-supplies-orphan",
      category: "ORPHAN",
      priority: 62,
      type: "FIXED_PRICE",
      price: 15.00,
    },

    // 7. WE ARE TOGETHER WITH OUR ORPHANS
    {
      title: "Gift for Orphans",
      description: "With your donation, you can bring joy to orphans through clothing, toys, food, and special care.",
      image: "/images/children.jpg",
      slug: "gift-for-orphans",
      category: "WE_ARE_TOGETHER_WITH_OUR_ORPHANS",
      priority: 70,
      type: "FIXED_PRICE",
      price: 30.00,
    },
    {
      title: "Eid Clothes for Orphans",
      description: "Help orphan children celebrate Eid with new clothes and a renewed sense of dignity and happiness.",
      image: "/images/children.jpg",
      slug: "eid-clothes-for-orphans",
      category: "WE_ARE_TOGETHER_WITH_OUR_ORPHANS",
      priority: 71,
      type: "FIXED_PRICE",
      price: 25.00,
    },
    {
      title: "Birthday Joy for Orphans",
      description: "Support simple celebrations and gifts that make orphan children feel loved, valued, and remembered.",
      image: "/images/children.jpg",
      slug: "birthday-joy-for-orphans",
      category: "WE_ARE_TOGETHER_WITH_OUR_ORPHANS",
      priority: 72,
      type: "FIXED_PRICE",
      price: 20.00,
    },

    // 8. WATER WELL PROJECT
    {
      title: "Water Well Fund",
      description: "You can donate any amount to the drinking water wells fund. The collected money is used to build or repair wells in needy regions.",
      image: "https://sni-prod.s3.eu-north-1.amazonaws.com/uploads/1774369757024-img_7656.webp",
      slug: "water-well-fund",
      category: "WATER_WELL_PROJECT",
      priority: 80,
      type: "DONATION",
      price: null,
    },
    {
      title: "Village Water Well Tanzania",
      description: "Support the construction of a clean water well for a village in Tanzania and help families access safe drinking water.",
      image: "https://sni-prod.s3.eu-north-1.amazonaws.com/uploads/1774369754817-img_7779.webp",
      slug: "village-water-well-tanzania",
      category: "WATER_WELL_PROJECT",
      priority: 81,
      type: "DONATION",
      price: null,
      goalAmount: 6000,
      raisedAmount: 0,
    },
    {
      title: "Hand Pump Water Well",
      description: "Help install a hand pump water well in a rural community where families currently walk long distances for water.",
      image: "https://sni-prod.s3.eu-north-1.amazonaws.com/uploads/1774368356187-img_7706.webp",
      slug: "hand-pump-water-well",
      category: "WATER_WELL_PROJECT",
      priority: 82,
      type: "DONATION",
      price: null,
      goalAmount: 3500,
      raisedAmount: 0,
    },
    {
      title: "Water Storage Tank Support",
      description: "Support installation of water storage tanks for schools, mosques, and communities with limited water access.",
      image: "/assets/MASJID/DJI_20250902124328_0005_D.JPG",
      slug: "water-storage-tank-support",
      category: "WATER_WELL_PROJECT",
      priority: 83,
      type: "DONATION",
      price: null,
      goalAmount: 2500,
      raisedAmount: 0,
    },

    // 9. ZAKAT AND SADAKA
    {
      title: "Zakat",
      description: "We deliver your zakat to those in need, including the poor, orphans, students, elderly people, and vulnerable families.",
      image: "/images/hands.jpg",
      slug: "zakat-general",
      category: "ZAKAT_AND_SADAKA",
      priority: 90,
      type: "DONATION",
      price: null,
    },
    {
      title: "Sadaqa",
      description: "Your Sadaqah donations are allocated to charity projects that benefit vulnerable communities throughout the year.",
      image: "/images/hands.jpg",
      slug: "sadaqa-general",
      category: "ZAKAT_AND_SADAKA",
      priority: 91,
      type: "DONATION",
      price: null,
    },
    {
      title: "Sadaqah Jariyah",
      description: "Give continuous charity that creates lasting benefit through water, education, shelter, and community support projects.",
      image: "/images/hands.jpg",
      slug: "sadaqah-jariyah",
      category: "ZAKAT_AND_SADAKA",
      priority: 92,
      type: "DONATION",
      price: null,
    },

    // 10. EDUCATION AID
    {
      title: "Student Scholarship",
      description: "Support students with limited financial means and give them hope for the future.",
      image: "/assets/QUR_DISTRIBUTION/IMG_4157.JPG",
      slug: "student-scholarship",
      category: "EDUCATION_AID",
      priority: 100,
      type: "FIXED_PRICE",
      price: 20.00,
    },
    {
      title: "Madrasa Student Support",
      description: "Help madrasa students with school materials, uniforms, and daily study needs.",
      image: "/assets/QUR_DISTRIBUTION/IMG_4157.JPG",
      slug: "madrasa-student-support",
      category: "EDUCATION_AID",
      priority: 101,
      type: "FIXED_PRICE",
      price: 25.00,
    },
    {
      title: "School Desk Donation",
      description: "Provide desks for overcrowded classrooms in rural schools and create a better learning environment.",
      image: "https://sni-prod.s3.eu-north-1.amazonaws.com/uploads/1774372341467-img_1127.webp",
      slug: "school-desk-donation",
      category: "EDUCATION_AID",
      priority: 102,
      type: "FIXED_PRICE",
      price: 50.00,
    },
    {
      title: "Quran Distribution",
      description: "Help distribute Qurans to students, madrasas, and communities in need of Islamic learning materials.",
      image: "https://sni-prod.s3.eu-north-1.amazonaws.com/uploads/1774372200282-img_4099.webp",
      slug: "quran-distribution",
      category: "EDUCATION_AID",
      priority: 103,
      type: "FIXED_PRICE",
      price: 10.00,
    },

    // 11. HEALTH
    {
      title: "Cataract Surgery",
      description: "Restore sight through free cataract surgeries for patients who cannot afford treatment.",
      image: "https://sni-prod.s3.eu-north-1.amazonaws.com/uploads/1774372447824-jq0g3807.webp",
      slug: "cataract-surgery",
      category: "HEALTH",
      priority: 110,
      type: "FIXED_PRICE",
      price: 75.00,
    },
    {
      title: "Maternal Health Support",
      description: "Support basic maternal health care for vulnerable mothers, including checkups and essential supplies.",
      image: "/images/hands.jpg",
      slug: "maternal-health-support",
      category: "HEALTH",
      priority: 111,
      type: "DONATION",
      price: null,
    },
    {
      title: "Medicine Support Fund",
      description: "Help provide essential medicines for patients in need who cannot afford treatment.",
      image: "/images/hands.jpg",
      slug: "medicine-support-fund",
      category: "HEALTH",
      priority: 112,
      type: "DONATION",
      price: null,
    },
    {
      title: "Wheelchair Donation",
      description: "Provide mobility support for people with disabilities through the donation of wheelchairs.",
      image: "https://sni-prod.s3.eu-north-1.amazonaws.com/uploads/1774372128175-wheelchair-for-africa-1-664x1024.webp",
      slug: "wheelchair-donation",
      category: "HEALTH",
      priority: 113,
      type: "FIXED_PRICE",
      price: 120.00,
    },

    // 12. TANZANIA AIDS
    {
      title: "International Relief Fund",
      description: "Support urgent international humanitarian relief projects where help is needed most.",
      image: "/images/children.jpg",
      slug: "international-relief-fund",
      category: "TANZANIA_AIDS",
      priority: 120,
      type: "DONATION",
      price: null,
    },


    {
      title: "Bajaj (Tricycle) Local Transport",
      description: "Donating a Bajaj to a family in need to create a sustainable source of income through local transport services.",
      image: "https://sni-prod.s3.eu-north-1.amazonaws.com/uploads/1774371417559-38.webp",
      slug: "bajaj-transport-tanzania",
      category: "INCOME_SUPPORT",
      priority: 132,
      type: "DONATION",
      price: null,
      goalAmount: 3500,
      raisedAmount: 2800,
    },
    {
      title: "Sewing Machine for Widows",
      description: "Help a widow or vulnerable woman start a tailoring business with a sewing machine and basic startup support.",
      image: "https://sni-prod.s3.eu-north-1.amazonaws.com/uploads/1774371255061-sewing.webp",
      slug: "sewing-machine-for-widows",
      category: "INCOME_SUPPORT",
      priority: 133,
      type: "DONATION",
      price: null,
      goalAmount: 300,
      raisedAmount: 0,
    },
    {
      title: "Small Shop Startup Support",
      description: "Help a poor family establish a small business kiosk to generate sustainable daily income.",
      image: "/images/hands.jpg",
      slug: "small-shop-startup-support",
      category: "INCOME_SUPPORT",
      priority: 134,
      type: "DONATION",
      price: null,
      goalAmount: 800,
      raisedAmount: 0,
    },


    // 14. GENERAL HELPS
    {
      title: "Foundation Support",
      description: "Help us maintain our operational capacity so we can continue to deliver aid effectively to those who need it most.",
      image: "/images/hands.jpg",
      slug: "foundation-support",
      category: "GENERAL_HELPS",
      priority: 140,
      type: "DONATION",
      price: null,
    },
    {
      title: "Ambulance transport Support",
      description: "Help cover transportation costs for patients, field teams, volunteers, and outreach workers.",
      image: "https://sni-prod.s3.eu-north-1.amazonaws.com/uploads/1774371965065-ambulance.webp",
      slug: "ambulance-transport-support",
      category: "GENERAL_HELPS",
      priority: 141,
      type: "DONATION",
      price: null,
    },

    // 15. CONSTRUCTION PROJECTS
    {
      title: "Integrated Children’s Care Complex",
      description: "Support the construction of a comprehensive children’s care complex in Tanzania designed to provide orphaned and vulnerable children with safe shelter, quality education, healthcare, and Islamic learning. This all-in-one complex will include an orphanage, school, hospital, madrasa, dining facilities, sanitation infrastructure, and other essential community services to ensure holistic care, protection, and development.",
      image: "https://sni-prod.s3.eu-north-1.amazonaws.com/uploads/1774368485790-f43dedee-840d-4c25-bde3-7a504f6a82d6.webp",
      slug: "integrated-childrens-care-complex-tanzania",
      category: "CONSTRUCTION_PROJECTS",
      priority: 150,
      type: "DONATION",
      price: null,
      goalAmount: 150000,
      raisedAmount: 45000,
    },

    {
      title: "Healthcare Supply for Rural Clinics",
      description: "Emergency healthcare equipment and supplies deployed to rural clinics across Tanzania.",
      image: "/images/hands.jpg",
      slug: "wellcare-package-tanzania",
      category: "CONSTRUCTION_PROJECTS",
      priority: 152,
      type: "DONATION",
      price: null,
      goalAmount: 150000,
      raisedAmount: 12000,
    },
    {
      title: "Masjid Construction Zanzibar",
      description: "Building a community masjid in Zanzibar to serve as a hub for prayer and education.",
      image: "https://sni-prod.s3.eu-north-1.amazonaws.com/uploads/1774368485796-img_4775.webp",
      slug: "masjid-construction-zanzibar",
      category: "CONSTRUCTION_PROJECTS",
      priority: 153,
      type: "DONATION",
      price: null,
      goalAmount: 15000,
      raisedAmount: 14500,
    },

    {
      title: "Madrasa Construction Fund",
      description: "Support the construction of madrasas where children can learn Quran and Islamic studies in a safe environment.",
      image: "https://sni-prod.s3.eu-north-1.amazonaws.com/uploads/1774370809332-screenshot-2026-03-24-at-19.46.20.webp",
      slug: "madrasa-construction-fund",
      category: "CONSTRUCTION_PROJECTS",
      priority: 155,
      type: "DONATION",
      price: null,
      goalAmount: 25000,
      raisedAmount: 0,
    },
  ];

  if (!adminOnlySeed) {
    for (const activity of activities) {
      await prisma.activity.upsert({
        where: { slug: activity.slug },
        update: activity,
        create: activity,
      });
    }
  }

  const adminEmail = process.env.ADMIN_SEED_EMAIL;
  const adminPassword = process.env.ADMIN_SEED_PASSWORD;

  if (adminEmail && adminPassword) {
    const password = await bcrypt.hash(adminPassword, 10);

    await prisma.user.upsert({
      where: { email: adminEmail },
      update: {
        password,
        role: 'ADMIN',
      },
      create: {
        email: adminEmail,
        password,
        role: 'ADMIN',
        firstName: process.env.ADMIN_SEED_FIRST_NAME || 'Mina',
        lastName: process.env.ADMIN_SEED_LAST_NAME || 'Admin',
      },
    });

    console.log(`Admin seed ensured for ${adminEmail}.`);
  }

  console.log(
    adminOnlySeed
      ? 'Admin-only seed completed.'
      : `Seeding completed. Inserted/Updated ${activities.length} records.`,
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
