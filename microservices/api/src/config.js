let projectConfig = {
    url: {
        data: 'http://data.hasura/v1/query',
        fileStore: "http://filestore.hasura/v1/file/",
        auth:  {
          delete_user:"http://auth.hasura/v1/admin/delete-user",
          signup:"http://auth.hasura/signup"
        }
    },
}

if (process.env.ENVIRONMENT === 'dev') {
  projectConfig.url.data = 'http://127.0.0.1:6432/v1/query';
}

module.exports = {
  projectConfig
};
