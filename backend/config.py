"""
Configuration settings
"""
import os
from typing import List


class Settings:
    """Application settings"""
    
    # App
    APP_NAME: str = "AutocobroApp API"
    APP_VERSION: str = "2.0.0"
    APP_DESCRIPTION: str = "API para gestionar productos con operaciones CRUD"
    
    # Database
    DATABASE_URL: str = os.getenv(
        "DATABASE_URL",
        "postgresql://user:password@localhost:5432/autocobro_db"
    )
    
    # CORS
    ALLOWED_ORIGINS: str = os.getenv("ALLOWED_ORIGINS", "*")
    
    # Server
    HOST: str = os.getenv("HOST", "0.0.0.0")
    PORT: int = int(os.getenv("PORT", "8000"))
    RELOAD: bool = os.getenv("RELOAD", "true").lower() in ("1", "true", "yes", "y")
    
    @property
    def cors_origins(self) -> List[str]:
        """Parse CORS origins from string"""
        if self.ALLOWED_ORIGINS.strip() == "*":
            return ["*"]
        return [origin.strip() for origin in self.ALLOWED_ORIGINS.split(",") if origin.strip()]


settings = Settings()
