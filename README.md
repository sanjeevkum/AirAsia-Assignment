# AirAsia Events Ticketing System

A full-stack events ticketing platform built with Spring Boot and Next.js.

## 🚀 Features
- **Events Management**: Create and list events.
- **Seat Allocation**: Visual seat map with real-time availability.
- **Booking System**: Reserve and book tickets.
- **Admin Dashboard**: Manage events.
- **Premium UI**: Dark mode, responsive design with Tailwind CSS.

## 🛠 Tech Stack
- **Backend**: Java 17, Spring Boot, Spring Data JPA, H2 Database (In-memory).
- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS.
- **Documentation**: OpenAPI / Swagger.

## 📦 Setup Instructions

### Backend (Spring Boot)
1. Navigate to `backend/`.
2. Build the project:
   ```bash
   mvn clean package
   ```
3. Run the application:
   ```bash
   java -jar target/ticketsystem-0.0.1-SNAPSHOT.jar
   ```
   *Alternatively, run `BootDashboard` in your IDE.*

4. **Verify**:
   - API: `http://localhost:8080/api/events`
   - Swagger Documentation: `http://localhost:8080/swagger-ui.html`

### Frontend (Next.js)
1. Navigate to `frontend/`.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. **Verify**:
   - Open `http://localhost:3000`.

## 🧪 Testing

### Run Backend Unit Tests
```bash
cd backend
mvn test
```

### Manual Testing Guide
1. **Create an Event** (Admin):
   - Go to `http://localhost:3000/admin`.
   - Fill in details (Name, Date, Total Seats).
   - Click "Create Event".

2. **Browse & Book**:
   - Go to `http://localhost:3000`.
   - Click on the event.
   - Select seats from the map.
   - Click "Proceed to Checkout".
   - Enter email and pay.

## 🐳 Docker (Optional)
Build and run the backend container:
```bash
cd backend
docker build -t airasia-backend .
docker run -p 8080:8080 airasia-backend
```
