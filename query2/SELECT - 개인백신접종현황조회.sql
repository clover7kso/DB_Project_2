SELECT I.inject_date, H.orgnm, V.name, U.name
FROM INJECTION I, USER U, HOSPITAL H, VACCINE V
WHERE I.ssn=U.ssn AND I.orgcd=H.orgcd AND I.number=V.number AND U.ssn = "971220-1111115";