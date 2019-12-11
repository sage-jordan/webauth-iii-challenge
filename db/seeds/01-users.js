
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { username: 'LambdaSchool', password: 'ilovelambda', department: 'Admin'},
        { username: 'sage-jordan', password: 'password', department: 'Admin'},
        { username: 'student-user', password: 'ilovelambda', department: 'Student'},
      ]);
    });
};
