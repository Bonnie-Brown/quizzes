const faker = require('faker')

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
 return knex("clucks")
 .del()
 .then(function (){
  
  const clucks = [];
  for (let i = 0; i < 30; i++) {
    clucks.push({
      username: faker.internet.userName(),
      content: faker.company.catchPhrase(),
      imageUrl: faker.image.imageUrl()
    })
    
  }
 return knex('clucks').insert(clucks)

 })
};
