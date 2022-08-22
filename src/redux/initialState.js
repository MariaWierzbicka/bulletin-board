export const initialState = {
  posts: {
    data: [
      {
        _id: '1',
        author: 'the.admin@example.com',
        authorId: 'user1',
        created: new Date('2019-01-01T12:00:00Z'),
        updated: new Date('2019-01-01T12:00:00Z'),
        status: 'published',
        title: 'Welcome to our bulletin board!',
        text: 'Email me to register and get an account!',
        photo: 'https://picsum.photos/300/200' ,
        price: '20',
        phone: '123 456 789',
        location: 'Boston',
      }, {
        _id: '2',
        author: 'user123@example.com',
        authorId: 'user2',
        created: new Date('2019-01-05T16:35:17Z'),
        updated: new Date('2019-01-05T16:35:17Z'),
        status: 'published',
        title: 'Room for rent',
        text: 'I have a spare room for rent. Low price!',
        photo: null,
        price: null,
        phone: null,
        location: null,
      }],
    loading: {
      active: false,
      error: false,
    },
  },
  status: 'notLogged',
  users: [
    {
      _id: 'user1',
      email: 'the.admin@example.com',
      admin: true,
    },
    {
      _id: 'user2',
      email: 'user123@example.com',
      admin: false,

    },
  ],
  loggedUser: {
    _id: 'user2',
    email: 'user123@example.com',
    admin: false,
  },
};
