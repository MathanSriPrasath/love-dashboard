# Love Dashboard - Backend

Spring Boot REST API for the Love Dashboard application.

## Tech Stack
- **Java 17**
- **Spring Boot 3.2.2**
- **Spring Data JPA**
- **MySQL 8.0+**
- **Lombok**
- **Maven**

## Project Structure
```
backend/
├── src/main/java/com/lovedashboard/
│   ├── LoveDashboardApplication.java   # Main application class
│   ├── config/                         # Configuration classes
│   │   └── CorsConfig.java
│   ├── controller/                     # REST Controllers
│   │   ├── AuthController.java
│   │   ├── CoupleController.java
│   │   ├── ImportantDateController.java
│   │   ├── LoveLetterController.java
│   │   └── MemoryController.java
│   ├── dto/                            # Data Transfer Objects
│   │   ├── AuthRequest.java
│   │   ├── AuthResponse.java
│   │   ├── CoupleDTO.java
│   │   ├── ImportantDateDTO.java
│   │   ├── LoveLetterDTO.java
│   │   └── MemoryDTO.java
│   ├── entity/                         # JPA Entities
│   │   ├── Couple.java
│   │   ├── ImportantDate.java
│   │   ├── LoveLetter.java
│   │   └── Memory.java
│   ├── repository/                     # JPA Repositories
│   │   ├── CoupleRepository.java
│   │   ├── ImportantDateRepository.java
│   │   ├── LoveLetterRepository.java
│   │   └── MemoryRepository.java
│   └── service/                        # Business Logic
│       ├── AuthService.java
│       ├── CoupleService.java
│       ├── ImportantDateService.java
│       ├── LoveLetterService.java
│       └── MemoryService.java
├── src/main/resources/
│   └── application.properties          # Application configuration
├── database/
│   ├── schema.sql                      # Database schema
│   └── sample-data.sql                 # Sample data for testing
└── pom.xml                             # Maven dependencies
```

## Setup Instructions

### 1. Prerequisites
- Java 17 or higher
- MySQL 8.0 or higher
- Maven 3.6 or higher

### 2. Database Setup

**Step 1: Start MySQL**
```bash
# macOS (using Homebrew)
brew services start mysql

# Or connect to your MySQL installation
```

**Step 2: Create Database and Tables**
```bash
# Login to MySQL
mysql -u root -p

# Run the schema script
source database/schema.sql

# (Optional) Insert sample data
source database/sample-data.sql
```

### 3. Configure Application

Edit `src/main/resources/application.properties`:

```properties
# Update these values according to your MySQL setup
spring.datasource.url=jdbc:mysql://localhost:3306/love_dashboard?createDatabaseIfNotExist=true&useSSL=false&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=YOUR_MYSQL_PASSWORD
```

### 4. Build and Run

```bash
# Navigate to backend directory
cd backend

# Build the project
mvn clean install

# Run the application
mvn spring-boot:run
```

The backend will start on **http://localhost:8080**

## API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | Authenticate using dates |

**Request Body:**
```json
{
  "anniversaryDate": "2020-02-14",
  "herDateOfBirth": "1995-05-20",
  "hisDateOfBirth": "1993-08-15"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Authentication successful",
  "coupleId": 1
}
```

### Couple Information
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/couple/{id}` | Get couple details |

### Love Letters
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/love-letters/couple/{coupleId}` | Get all love letters |

### Memories
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/memories/couple/{coupleId}` | Get all memories |

### Important Dates
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/important-dates/couple/{coupleId}` | Get all important dates |

## Testing the API

### Using curl:
```bash
# Test authentication
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "anniversaryDate": "2020-02-14",
    "herDateOfBirth": "1995-05-20",
    "hisDateOfBirth": "1993-08-15"
  }'

# Get couple information
curl http://localhost:8080/api/couple/1

# Get love letters
curl http://localhost:8080/api/love-letters/couple/1
```

## Development Notes

- **CORS**: Configured to allow requests from `http://localhost:3000` (React frontend)
- **Database**: Using JPA with Hibernate for ORM
- **Auto-update**: `spring.jpa.hibernate.ddl-auto=update` will automatically update schema
- **Validation**: Input validation enabled using Jakarta Validation

## Troubleshooting

**Port already in use:**
```
Change server.port in application.properties
```

**MySQL connection error:**
```
Verify MySQL is running and credentials are correct
```

**Build errors:**
```bash
mvn clean install -U
```

