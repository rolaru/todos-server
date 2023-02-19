const dummyUsers = [
  {
    id: '940c75ce-d0f7-4614-b713-30e6dacebeaf',
    fullName: 'Olaru Razvan',
    email: 'olarurazvan_2000@yahoo.com',
    password: 'Test1234'
  }
];

const authResolvers = {};

authResolvers.mutations = {
  async login(root, { email, password }) {
    return dummyUsers[0];
  },

  async register(root, { email, password, fullName }) {
    return dummyUsers[0];
  },
};

module.exports = authResolvers