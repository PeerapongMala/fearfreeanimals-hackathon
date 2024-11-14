CREATE TABLE roles (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL COMMENT 'ชื่อของ role เช่น GENERAL หรือ PATIENT'
);

CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL COMMENT 'ชื่อผู้ใช้งานในระบบ',
    password VARCHAR(255) NOT NULL COMMENT 'รหัสผ่าน',
    role_id BIGINT NOT NULL COMMENT 'อ้างอิง role_id',
    access_code VARCHAR(50) DEFAULT NULL COMMENT 'โค้ดสำหรับผู้ป่วยที่ได้รับจากหมอ',
    fear_level INT DEFAULT 0 COMMENT 'ระดับความกลัว',
    coins INT DEFAULT 0 COMMENT 'จำนวนเหรียญที่มี',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'วันที่สร้างผู้ใช้',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'วันที่แก้ไขล่าสุด',
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
);

CREATE TABLE assessments (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL COMMENT 'อ้างอิงถึงผู้ใช้งานที่ทำแบบประเมิน',
    score INT COMMENT 'คะแนนที่ได้จากการประเมิน',
    fear_percentage DOUBLE COMMENT 'เปอร์เซ็นต์ความกลัวที่คำนวณได้',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'วันที่ทำแบบประเมิน',
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE game_progress (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL COMMENT 'อ้างอิงถึงผู้ใช้งาน',
    animal_type VARCHAR(50) COMMENT 'ประเภทสัตว์ที่ผู้เล่นกำลังเล่น',
    current_level INT DEFAULT 1 COMMENT 'เลเวลปัจจุบันของผู้เล่น',
    completed BOOLEAN DEFAULT FALSE COMMENT 'สถานะว่าผู้เล่นผ่านเกมหรือยัง',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'วันที่อัพเดตล่าสุด',
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE rewards (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL COMMENT 'ชื่อรางวัล',
    description TEXT NOT NULL COMMENT 'รายละเอียดของรางวัล',
    coin_cost INT NOT NULL COMMENT 'จำนวนเหรียญที่ต้องใช้เพื่อแลก',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'วันที่สร้างรางวัล',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'วันที่อัพเดตข้อมูลรางวัลล่าสุด'
);

CREATE TABLE reward_redemptions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL COMMENT 'อ้างอิงถึงผู้ใช้งานที่แลกรางวัล',
    reward_id BIGINT NOT NULL COMMENT 'อ้างอิงถึงรางวัลที่แลก',
    redeemed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'วันที่แลกรางวัล',
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (reward_id) REFERENCES rewards(id) ON DELETE CASCADE
);
--ALTER TABLE users MODIFY COLUMN access_code VARCHAR(10) COMMENT 'Access Code รูปแบบสั้น เช่น FFANM001';
-- หากคอลัมน์ยังไม่ถูกสร้างหรือไม่ได้ตั้งค่า COMMENT ให้ลองใช้คำสั่งนี้

-- 1. เปลี่ยนชื่อและเพิ่มคำอธิบาย
ALTER TABLE users ALTER COLUMN access_code SET DATA TYPE VARCHAR(10);
-- ถ้าคุณต้องการเพิ่ม COMMENT ให้กับคอลัมน์ในฐานข้อมูล H2
--COMMENT ON COLUMN users.access_code IS 'Access Code FFANM001';

-- หากต้องการเพิ่มคอลัมน์ใหม่ก็สามารถทำได้เช่นเดียวกัน
-- ALTER TABLE users ADD COLUMN access_code VARCHAR(10) COMMENT 'Access Code FFANM001';
