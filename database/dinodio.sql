CREATE TABLE "Portafolio" (

  "id" SERIAL PRIMARY KEY,

  "id_empresa" int4,

  "titulo" int8,

  "puesto" varchar(20),

  "cliente" varchar(20),

  "tipo" varchar(20),

  "descripcion" text,

  "lenguajes" text,

  "framewords" text,

  "url_imagen" text

  

  -- ,CONSTRAINT "_copy_1" PRIMARY KEY ("id")

);



INSERT INTO Portafolio (id_empresa, nivel_importancia, titulo, puesto, cliente, tipo, descripcion, lenguajes, db, framewords, url_imagen, url_sitio_web)

    VALUES 

    (1, nivel_importancia, "Manpresa web", "Full-Stack", "Mancomunado de prevención y salud laboral Maracay", 1, "descripcion", "Php, Javascript", "MySql", "Jquery", url_imagen, url_sitio_web, repositorio),

    (2, nivel_importancia, titulo, Full-Stack, cliente, "1", descripcion, lenguajes, db, framewords, url_imagen, url_sitio_web);





----------------------------------------------

-- mongo

