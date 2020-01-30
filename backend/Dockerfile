FROM ruby:2.6.3

RUN apt-get update && apt-get install -y --no-install-recommends postgresql-client && rm -rf /var/lib/apt/lists/*

WORKDIR /backend

COPY Gemfile Gemfile.lock ./
#ENV RAILS_ENV production
#RUN bundle install --deployment --without development test
# In order to get meaningfull stack traces from backend comment out the ENV and RUN command on top and uncomment
# RUN command below. Next rebuild and repush the image to docker hub. It's not completely clear to me if you
# need to delete and apply configs to k8s as well. Better to do this as well
RUN bundle install
COPY . .

COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]

CMD ["bundle","exec","rails", "server", "-b", "0.0.0.0"]
