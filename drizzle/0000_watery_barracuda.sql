CREATE TABLE "sensor" (
	"api_key" varchar(100) NOT NULL,
	"description" text,
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "sensor_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "sensor_api_key_unique" UNIQUE("api_key")
);
--> statement-breakpoint
CREATE TABLE "sensor_data" (
	"gps_altitude" double precision,
	"gps_latitude" double precision,
	"gps_longitude" double precision,
	"humidity_percent" double precision NOT NULL,
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "sensor_data_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"pm10" double precision,
	"pm25" double precision,
	"sensor_id" integer NOT NULL,
	"temperature_celsius" double precision NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "sensor_data" ADD CONSTRAINT "sensor_data_sensor_id_sensor_id_fk" FOREIGN KEY ("sensor_id") REFERENCES "public"."sensor"("id") ON DELETE cascade ON UPDATE cascade;