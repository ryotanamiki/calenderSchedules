-- カレンダースケジュール用のデータベースを作成
CREATE DATABASE IF NOT EXISTS calender;

-- 作成したデータベースを使用
USE calender;

-- スケジュールを格納するためのテーブルを作成
CREATE TABLE IF NOT EXISTS schedules (
    id INT AUTO_INCREMENT PRIMARY KEY,  -- スケジュールの一意のID
    date DATE NOT NULL,                -- スケジュールの日付
    title VARCHAR(255) NOT NULL,        -- スケジュールのタイトル
    user VARCHAR(255) NOT NULL,     -- 記入者のユーザー名
    content TEXT,                       -- スケジュールの内容
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- スケジュール作成日時
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP -- スケジュール更新日時
);

-- テーブルの文字セットと照合順序を設定（日本語向けにUTF-8を指定）
ALTER TABLE schedules
    CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- データベースとテーブルの作成が成功したことを確認
