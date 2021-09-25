## 🔌 Configuraciones

Es necesario crear la base de datos **nahual** en su servidor pgAdmin.

## 💿 Instalar Dependencias

Desde su CLI y dentro de la carpeta Nahual-ServicioDatos, ejecuta el siguiente comando:

npm install

**Asegúrese de haber modificado las configuraciones de la base de datos dentro de config/config.json**

Para ejecutar migraciones use el siguiente comando dentro de la carpeta Nahual-ServicioDatos **solo use este comando una vez cuando el esquema no esté configurado**:

npx sequelize-cli db:migrate

Para ejecutar las semillas, use el siguiente comando **solo se necesita en un entorno local/desarrollo, evite usarlo en producción** :

npx sequelize-cli db:seed:all

## 💻 Ejecutar Proyecto

Para ejecutar el proyecto use el siguiente comando dentro de la carpeta Nahual-ServicioDatos:

npm run start --env=<environment>

Para ejecutar en un entorno de desarrollo, utilice el siguiente comando:

npm run dev --env=<enviroment>

Entornos posibles:

* development
* test
* production

Para ver la documentación de Swagger, ejecute en su navegador:

https://nahual-datos-estudiantes.herokuapp.com/api-docs/

Para ver el esquema de la base de datos, ejecute en su navegador:

https://drive.google.com/file/d/1huv1D0Qr0mc9ONbs4zp0svKCvj8JGP1b/view

Se utilizaron PostgreSQL y Node.js para el desarrollo de este proyecto.