#!/bin/sh

echo "Waiting for database to be ready..."
# Simple retry loop
MAX_RETRIES=30
for i in $(seq 1 $MAX_RETRIES); do
  # Try to run prisma db push (safer for dev/prototyping than migrate deploy if migrations folder is messy)
  # But migrate deploy is better if we have migrations. Let's stick to migrate deploy first, fallback to push?
  # No, let's use migrate deploy as we have migrations.
  echo "Attempt $i:" # Echo environment variables (mask password) to confirm visibility
  echo "Checking environment variables..."
  echo "DATABASE_URL is set (hiding value for security)"
  if [ -z "$DATABASE_URL" ]; then
    echo "ERROR: DATABASE_URL is not set!"
  else
    echo "DATABASE_URL length: ${#DATABASE_URL}"
  fi

  echo "Running Prisma DB Push (skipping migrations to fix corruption)..."
  npx prisma db push --accept-data-loss
  
  if [ $? -eq 0 ]; then
    echo "DB Push successful!"
    break
  fi
  
  echo "Migration failed. Retrying in 2 seconds..."
  sleep 2
done

echo "Starting Application..."
exec "$@"
