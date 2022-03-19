#!/usr/bin/with-contenv bashio

bashio::log.info 'Starting the alessio service...'

# Change working directory
cd /src || bashio::exit.nok 'Unable to change working directory'

# Run the alessio service
bashio::log.info 'Executing startup script'
exec node --trace-warnings .
