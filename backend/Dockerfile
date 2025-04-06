# Use an official lightweight Python image
FROM python:3.9-slim

# Set the working directory inside the container
WORKDIR /backend

# Copy the Flask app files into the container
COPY . /backend

# Install Python dependencies
RUN pip install --no-cache-dir -r requirement.txt

ENV FLASK_DEBUG=Flase

# Expose Flask’s port (5000)
EXPOSE 5000

# Command to run Flask
CMD ["python", "app.py"]
