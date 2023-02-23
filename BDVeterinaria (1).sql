
drop database if exists BDVeterinaria;
create database if not exists BDVeterinaria;
use BDVeterinaria;
 
create table usuario(
codUsuario int auto_increment primary key not null,
nombres varchar (20) NOT NULL default(''),
paterno varchar (15) NOT NULL default(''),
materno varchar (15) NOT NULL default(''),
ci int not null default(0),
direccion varchar(50) NOT NULL default(''),
genero set ('masculino','femenino') not null,
celular int not null default(0),
fechaNacimiento date default(0),
email varchar(100) NULL default('')
);

insert into usuario(nombres, paterno, materno, ci, direccion, genero, celular, fechaNacimiento,email) values
('Diego','Hurtado','Silva',6836899,'Bajo Llojeta','masculino',70588821,'2001-10-01','diego@gmail.com'),
('Alex','Copa','Catari',6810202,'Villa Fatima','masculino',73574893,'2001-06-18','alex@gmail.com');
create table empleado(
codEmpleado smallint primary key not null,
tipoEmpleado set ('doctor','enfermero') not null ,
codUsuario int not null default(0),
foreign key (codUsuario) references usuario(codUsuario)
);
insert into empleado values
(1,'enfermero',1),
(2,'doctor',2);
create table login (
usuario varchar(20) not null primary key,
contraseña varchar(70) not null,
codUsuario int not null,
usuResponsable varchar(20) not null, /*usuario que creo este usuario*/
fechaCreacion timestamp default current_timestamp,
foreign key (codUsuario) references usuario(codUsuario)
);
insert into login (usuario,contraseña,codUsuario,usuResponsable) values
('xlea','123',2,'xlea'),
('uveja','123',1,'xlea');
create table paciente (
  codPaciente int auto_increment primary key not null,
  nombreMascota varchar(20) not null default(''),
  especie set ('perro','gato','otro') not null,
  raza VARCHAR(30) not null default(''),
  color varchar(15) not null,
  tamaño set ('pequeño','mediano','grande') not null,
  peso float not null default(0),
  sexo  bit NOT NULL
 );
 insert into paciente (nombreMascota,especie,raza,color,tamaño,peso,sexo) values
 ('Baffy','perro','Schanauzer','negro','pequeño',3.5,1),
 ('Mica','gato','Angora','naranja','mediano',1.2,0);
create table servicio (
  codServicio smallint primary key not null,
  tipoServicio varchar(30) not null,
  precio float not null,
  descripcion varchar(100)
  );
  insert into servicio values
  (1,'consulta general',50,'El animal recibe un diagnostico en que estado se encuentra');
create table cita(
codCita int auto_increment primary key,
codPaciente int not null,
fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
descripcion VARCHAR(50) NOT NULL default(''),
fechaProxima date not null default(0),
hora varchar(5),
foreign key (codPaciente) references paciente(codPaciente)
);
insert into cita (codPaciente,descripcion,fechaProxima,hora) values
(2,'revision general','2023-02-21','15:30');
create table historial(
codHistorial int auto_increment primary key,
descripcion varchar(250) not null,
fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
codServicio smallint not null,
codEmpleado smallint not null,
codPaciente int not null,
foreign key (codServicio) references servicio(codServicio),
foreign key (codEmpleado) references empleado(codEmpleado),
foreign key (codPaciente) references paciente(codPaciente)
);
insert into historial (descripcion,codServicio,codEmpleado,codPaciente) values
('Tuvo una cita revision general',1,2,2);
create table tipoPago(
codPago int auto_increment primary key,
nombre varchar (20)not null,
descripcion varchar (100) not null
);
insert into tipoPago (nombre,descripcion) values
('efectivo','Este pago se realiza con dinero fisico'),
('tarjeta','Este pago se realiza mediante una tarjeta de debito');
create table factura(
codFactura int auto_increment primary key not null ,
tipoDocumento set ('NIT','CI','Vacio') not null,
numDocumento varchar(10) null,
nombre varchar(30)null,
fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
codPago int not null,
foreign key (codPago) references tipoPago(codPago)
);
insert into factura (tipoDocumento,numDocumento,nombre,codPago) values
('NIT','3340943017','Hurtado',1);

create table detalleFactura(
codDetalleFactura int auto_increment primary key,
codFactura int not null,
codServicio smallint not null,
codEmpleado smallint not null,
codPaciente int not null,
costoUnitario float not null,
descripcion varchar(200) not null default(''),
foreign key (codEmpleado) references empleado(codEmpleado),
foreign key (codPaciente) references paciente(codPaciente),
foreign key (codServicio) references servicio(codServicio),
foreign key (codFactura) references factura(codFactura)
);
insert into detalleFactura (codFactura,codServicio,codEmpleado,codPaciente,costoUnitario,descripcion) values
(1,1,2,2,50,'pago de consulta general');

select * from usuario;
select * from empleado;
select * from paciente;
select * from servicio;
select * from login;
select * from historial;
select * from cita;
select * from factura;
select * from detalleFactura;