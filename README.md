# How to Start It Up?

To start this app up, make sure to have the latest versions of Node, Ruby, and Rails. Yarn is also nice to have.

Then, run:

```
cd crud-rails-angular

bundle install
bundle exec rake webpacker:install
bundle exec rake webpacker:install:angular
rails db:migrate
rake db:seed

yarn
```

Then, to start it up, run:

```
rails s
```
