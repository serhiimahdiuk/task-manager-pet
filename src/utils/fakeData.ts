import { faker } from "@faker-js/faker";

export const fakeData = new Array(20).fill(0).map((_, index) => ({
  title: faker.lorem.words({ min: 3, max: 6 }),
  date: faker.date.recent({ days: 10 }).toString(),
  description: faker.lorem.paragraph(7),
}));
