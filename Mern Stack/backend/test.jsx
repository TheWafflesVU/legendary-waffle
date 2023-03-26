const request = require('supertest');
const app = require('/Users/helensun/Downloads/waffle/legendary-waffle/Mern Stack/frontend/src/App.js');
const Project = require('/Users/helensun/Downloads/waffle/legendary-waffle/Mern Stack/backend/controllers/projectController.js');

describe('searchProject function', () => {
  beforeAll(async () => {
    // Connect to a test database and insert test data
    await mongoose.connect(process.env.MONGO_URI_TEST, { useNewUrlParser: true });
    await Project.insertMany([
      { title: 'Project 1', description: 'This is project 1', tags: ['tag1', 'tag2'] },
      { title: 'Project 2', description: 'This is project 2', tags: ['tag2', 'tag3'] },
      { title: 'Project 3', description: 'This is project 3', tags: ['tag1', 'tag3'] },
    ]);
  });

  afterAll(async () => {
    // Disconnect from the test database
    await mongoose.connection.close();
  });

  it('should return projects that match the search query and tags', async () => {
    const response = await request(app)
      .get('/search/tag1,tag2?q=project')
      .expect(200);
    expect(response.body).toEqual([
      { _id: expect.any(String), title: 'Project 1', description: 'This is project 1', tags: ['tag1', 'tag2'], nums: null, score: expect.any(Number), matchedTags: 2 },
    ]);
  });

  it('should return an empty array if no projects match the search query and tags', async () => {
    const response = await request(app)
      .get('/search/tag1,tag2?q=invalid')
      .expect(200);
    expect(response.body).toEqual([]);
  });
});