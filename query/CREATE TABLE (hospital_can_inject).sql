USE vaccine_erp;
DROP TABLE hospital_can_inject;
CREATE TABLE hospital_can_inject (
	hospital_id INT NOT NULL,
	time_id INT NOT NULL,
    possible INT NOT NULL DEFAULT 10,
    FOREIGN KEY (hospital_id) REFERENCES hospital(id),
    FOREIGN KEY (time_id) REFERENCES time(id),
    PRIMARY KEY (hospital_id, time)
);