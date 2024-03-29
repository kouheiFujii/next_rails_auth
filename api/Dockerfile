# syntax=docker/dockerfile:1.3-labs

FROM ruby:3.0

RUN <<eot
apt-get update -qq
apt-get install -yq --no-install-recommends
rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*
eot

ENV APP_ROUTE /app
WORKDIR $APP_ROUTE
COPY Gemfile $APP_ROUTE/Gemfile
COPY Gemfile.lock $APP_ROUTE/Gemfile.lock
RUN bundle install

COPY ./entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]

EXPOSE 3000

# Start the main process.
CMD ["rails", "server", "-b", "0.0.0.0"]
