var express = require('express');
var router = express.Router();
var config = require('./config');
var request = require('request');


// like other user
router.route("/like").post(function(req,res){
  console.log("are you see me.?")
  const hasura_id = req.headers['x-hasura-user-id'];
  //we can't allow to delete admin from this api
  if( hasura_id > 1){
    const hasura_role = req.headers['x-hasura-role'];
    const hasura_allowed_role = req.headers['x-hasura-allowed-roles'];
    const like_user_id = req.body.like_user_id;
      //Fetch all rows from table - articles
      var selectOptions = {
        url: config.projectConfig.url.data,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Hasura-User-Id': hasura_id,
          'X-Hasura-Role': hasura_role,
          "X-Hasura-Allowed-Roles": hasura_allowed_role
        },
        body: JSON.stringify({
          "type": "insert",
          "args": {
              "table": "match",
              "objects": [
                  {
                      "like_user_id": like_user_id,
                      "hasura_id": hasura_id
                  }
              ]
          }
        })
      }
      request(selectOptions, function(error, response, body) {
        if (error) {
            console.log(error)
            res.status(500).json({
              'error': error,
              'message': 'like request failed'
            });
        }
        res.json(JSON.parse(body))
      })
    }
    else{
      res.status(500).json({
        'message': 'like request failed'
      });
    }
});
//nope other user with his hasura_id
router.route("/nope").post(function(req,res){
  const hasura_id = req.headers['x-hasura-user-id'];
  //we can't allow to delete admin from this api
  if( hasura_id > 1){
    const hasura_role = req.headers['x-hasura-role'];
    const hasura_allowed_role = req.headers['x-hasura-allowed-roles'];
    const like_user_id = req.body.like_user_id;
      //Fetch all rows from table - articles
      var selectOptions = {
        url: config.projectConfig.url.data,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Hasura-User-Id': hasura_id,
          'X-Hasura-Role': hasura_role,
          "X-Hasura-Allowed-Roles": hasura_allowed_role
        },
        body: JSON.stringify({
          "type": "delete",
          "args": {
              "table": "match",
              "where": {
                  "$and": [
                      {
                          "hasura_id": {
                              "$eq": hasura_id
                          }
                      },
                      {
                          "like_user_id": {
                              "$eq": like_user_id
                          }
                      }
                  ]
              }
          }
        })
      }
      request(selectOptions, function(error, response, body) {
        if (error) {
            console.log(error)
            res.status(500).json({
              'error': error,
              'message': 'nope request failed'
            });
        }
        res.json(JSON.parse(body))
      })
    }
    else{
      res.status(500).json({
        'message': 'nope request failed'
      });
    }
});
// to get list of other like user
router.route("/like-users").get(function(req,res){
  const hasura_id = req.headers['x-hasura-user-id'];
  //we can't allow to delete admin from this api
  if( hasura_id > 1){
    // query to exe get all like user info
    var query = "select match.like_user_id, userinfo.name,userinfo.profile_file_id from match,userinfo where match.like_user_id = userinfo.hasura_id AND match.hasura_id ="+hasura_id;
      //Fetch all rows from table - articles
      var selectOptions = {
        url: config.projectConfig.url.data,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Hasura-User-Id': 1,
          'X-Hasura-Role': "admin",
          "X-Hasura-Allowed-Roles": "user,admin"
        },
        body: JSON.stringify({
                "type": "run_sql",
                "args": {
                  "sql": query
                }
              })
      }
      request(selectOptions, function(error, response, body) {
        if (error) {
            console.log(error)
            res.status(500).json({
              'error': error,
              'message': 'like-users request failed'
            });
        }
        res.json(JSON.parse(body))
      })
    }
    else{
      res.status(500).json({
        'message': 'like-users request failed'
      });
    }
});

router.route("/update-user").post(function(req,res){
  const hasura_id = req.headers['x-hasura-user-id'];
  //we can't allow to delete admin from this api
  if( hasura_id > 1){
    const hasura_role = req.headers['x-hasura-role'];
    const hasura_allowed_role = req.headers['x-hasura-allowed-roles'];
    const name = req.body.name;
    const email = req.body.email;
    const age = req.body.age;
    const about = req.body.about;
      //Fetch all rows from table - articles
      var selectOptions = {
        url: config.projectConfig.url.data,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Hasura-User-Id': hasura_id,
          'X-Hasura-Role': hasura_role,
          "X-Hasura-Allowed-Roles": hasura_allowed_role
        },
        body: JSON.stringify({
          "type": "update",
          "args": {
              "table": "userinfo",
              "where": {
                  "hasura_id": {
                      "$eq": hasura_id
                  }
              },
              "$set": {
                  "email": email,
                  "name": name,
                  "age": age,
                  "about_me": about
              }
          }
        })
      }
      request(selectOptions, function(error, response, body) {
        if (error) {
            console.log(error)
            res.status(500).json({
              'error': error,
              'message': 'update-user request failed'
            });
        }
        res.json(JSON.parse(body))
      })
    }
    else{
      res.status(500).json({
        'message': 'update-user request failed'
      });
    }
});

router.route("/insert-user").post(function(req,res){
  const hasura_id = req.headers['x-hasura-user-id'];
  //we can't allow to delete admin from this api
  if( hasura_id > 1){
    const hasura_role = req.headers['x-hasura-role'];
    const hasura_allowed_role = req.headers['x-hasura-allowed-roles'];
    const name = req.body.name;
    const email = req.body.email;
    const gender = req.body.gender;
    const file_id = req.body.file_id;
    const age = req.body.age;
    const about_me = req.body.about_me;
    const city = req.body.city;
      //Fetch all rows from table - articles
      var selectOptions = {
        url: config.projectConfig.url.data,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Hasura-User-Id': hasura_id,
          'X-Hasura-Role': hasura_role,
          "X-Hasura-Allowed-Roles": hasura_allowed_role
        },
        body: JSON.stringify({
          "type": "insert",
          "args": {
              "table": "userinfo",
              "objects": [
                  {
                      "hasura_id": hasura_id,
                      "name": name,
                      "email": email,
                      "gender": gender,
                      "profile_file_id": file_id,
                      "age":age,
                      "about_me": about_me,
                      "city": city
                  }
              ]
          }
        })
      }
      request(selectOptions, function(error, response, body) {
        if (error) {
            console.log(error)
            res.status(500).json({
              'error': error,
              'message': 'insert-user request failed'
            });
        }
        res.json(JSON.parse(body))
      })
    }
    else{
      res.status(500).json({
        'message': 'insert-user request failed'
      });
    }
});

router.route("/get-allusers-info").get(function(req,res){
  const hasura_id = req.headers['x-hasura-user-id'];
  //we can't allow to delete admin from this api
  if( hasura_id > 1){
      //Fetch all rows from table - articles
      var selectOptions = {
        url: config.projectConfig.url.data,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Hasura-User-Id': 1,
          'X-Hasura-Role': "admin",
          "X-Hasura-Allowed-Roles": "user,admin"
        },
        body: JSON.stringify({
          'type': 'select',
          'args': {
            'table': 'userinfo',
            'columns': [
              '*'
            ]
          }
        })
      }
      request(selectOptions, function(error, response, body) {
        if (error) {
            console.log(error)
            res.status(500).json({
              'error': error,
              'message': 'Select request failed'
            });
        }
        res.json(JSON.parse(body))
      })
    }
    else{
      res.status(500).json({
        'message': 'Select request failed'
      });
    }
});

router.route("/delete").post(function(req,res){
  //var hasura_id = req.body.hasura_id;
  const hasura_id = req.headers['x-hasura-user-id'];
  //we can't allow to delete admin from this api
  if( hasura_id > 1){
    // permission error occur when delete using bulk query by user
    // we need to exc. as admin for that ok
    const hasura_role = req.headers['x-hasura-role'];
    const hasura_allowed_role = req.headers['x-hasura-allowed-roles'];
    // common headers for request as admin
        var headers = {
            'Content-Type': 'application/json',
            'X-Hasura-User-Id': 1,
            'X-Hasura-Role': "admin",
            "X-Hasura-Allowed-Roles": "user,admin"
          }

          var deleteOptions = {
            url: config.projectConfig.url.auth.delete_user,
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                "hasura_id": Number(hasura_id)
            })
          }
          request(deleteOptions, function(error, response, body) {
            if (error) {
                console.log(error)
                res.status(500).json({
                  'error': error,
                'message': 'delete-user request failed'
              });
          }
          else
          {
            var selectFileOptions = {
              url: config.projectConfig.url.data,
              method: 'POST',
              headers: headers,
              body: JSON.stringify({
                "type": "select",
                "args": {
                    "table": "userinfo",
                    "columns": [
                        "profile_file_id"
                    ],
                    "where": {
                        "hasura_id": {
                            "$eq": Number(hasura_id)
                        }
                    }
                }
              })
            }
            request(selectFileOptions, function(error, response, body) {
              const lb = JSON.parse(body);
              if (error) {
                console.log(error);
                  res.status(500).json({
                    'error': error,
                    'message': 'delete-user request failed'
                  });
              }
              else{
                var file_id =  lb[0].profile_file_id
                var deleteFileOptions = {
                  url: config.projectConfig.url.fileStore+file_id,
                  method: 'DELETE',
                  headers: headers,
                }
                request(deleteFileOptions, function(error, response, body) {
                  if (error) {
                      console.log(error)
                      res.status(500).json({
                        'error': error,
                        'message': 'delete-user request failed'
                      });
                    }
                    else{

                                  var deleteOptions = {
                                  url: config.projectConfig.url.data,
                                  method: 'POST',
                                  body: JSON.stringify({
                                    headers: headers,
                                                        "type": "bulk",
                                                        "args": [
                                                            {
                                                                "type": "delete",
                                                                "args": {
                                                                    "table": "match",
                                                                    "where": {
                                                                        "$or": [
                                                                            {
                                                                                "hasura_id": {
                                                                                    "$eq": hasura_id
                                                                                }
                                                                            },
                                                                            {
                                                                                "like_user_id": {
                                                                                    "$eq": hasura_id
                                                                                }
                                                                            }
                                                                        ]
                                                                    }
                                                                }
                                                            },
                                                            {
                                                                "type": "delete",
                                                                "args": {
                                                                    "table": "userinfo",
                                                                    "where": {
                                                                        "hasura_id": {
                                                                            "$eq": hasura_id
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        ]
                                                      })
                                  }
                                  request(deleteOptions, function(error, response, body) {
                                  if (error) {
                                      console.log(error)
                                      res.status(500).json({
                                        'error': error,
                                        'message': 'delete-user request failed'
                                      });
                                  }
                                  res.json(JSON.parse(body))
                                  })
                    }
                })
              }
          //res.json(JSON.parse(body)) this line not execute anywhere
          })

          }
      })
    }
    else{
      res.status(500).json({
        'message': 'delete-user request failed'
      });
    }
});

module.exports = router;
