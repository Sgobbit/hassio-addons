ARG BUILD_FROM
FROM $BUILD_FROM

# Install requirements for add-on
RUN \
  apk add --no-cache \
    nodejs npm

# Copy data for add-on
COPY rootfs /

# Install node dependencies
RUN cd /src && npm install --unsafe-perm
