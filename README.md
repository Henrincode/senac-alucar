# Projeto SENAC - Alucar

## Criação do banco de dados:

```sql
-- 1. Marcas (Toyota, Honda, etc.)
CREATE TABLE alc_car_brands (
    id_car_brand BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);

-- 2. Categorias e Preços (SUV, Sedã, etc.)
CREATE TABLE alc_car_categories (
    id_car_category BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2), -- Preço da diária
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);

-- 3. Status da Reserva (Nova Tabela)
CREATE TABLE alc_rental_statuses (
    id_status BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,  -- Ex: Aguardando, Confirmada
    color_hex VARCHAR(7),        -- Ex: #FFFFFF
    created_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);

-- 4. Clientes
CREATE TABLE alc_clients (
    id_client BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);

-- 5. Modelos dos Carros
CREATE TABLE alc_car_models (
    id_car_model BIGSERIAL PRIMARY KEY,
    id_car_brand_fk BIGINT REFERENCES alc_car_brands(id_car_brand) ON DELETE CASCADE,
    id_car_category_fk BIGINT REFERENCES alc_car_categories(id_car_category) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    details TEXT,
    image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);

-- 6. Reservas
CREATE TABLE alc_rentals (
    id_rental BIGSERIAL PRIMARY KEY,
    id_client_fk BIGINT REFERENCES alc_clients(id_client) ON DELETE SET NULL,
    id_car_model_fk BIGINT REFERENCES alc_car_models(id_car_model) ON DELETE RESTRICT,
    id_status_fk BIGINT REFERENCES alc_rental_statuses(id_status) DEFAULT 1,
    
    pickup_date DATE NOT NULL,
    return_date DATE NOT NULL,
    
    total_price DECIMAL(10,2),
    notes TEXT,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);

-- Inserção de Status Iniciais (Exemplo)
INSERT INTO alc_rental_statuses (name, color_hex) VALUES 
('Aguardando', '#FFA500'),
('Confirmada', '#008000'),
('Cancelada', '#FF0000');
```