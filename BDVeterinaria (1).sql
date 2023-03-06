
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
genero char (1) not null,
celular int not null default(0),
fechaNacimiento date default(0),
email varchar(100) NULL default('')
);

insert into usuario(nombres, paterno, materno, ci, direccion, genero, celular, fechaNacimiento,email) values
('Diego','Hurtado','Silva',6836899,'Bajo Llojeta','M',70588821,'2001-10-01','diego@gmail.com'),
('Alex','Copa','Catari',6810202,'Villa Fatima','M',73574893,'2001-06-18','alex@gmail.com');
create table empleado(
codEmpleado smallint primary key not null,
tipoEmpleado varchar (20) not null ,
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
  sexo  char(1) NOT NULL
 );
 insert into paciente (nombreMascota,especie,raza,color,tamaño,peso,sexo) values
 ('Baffy','perro','Schanauzer','negro','pequeño',3.5,'M'),
 ('Pelusa','gato','Angora','plomo','grande',1.2,'H'),
 ('Sajta','gato','Albino','blanco','pequeño',0.9,'H'),
 ('Thorin','perro','Pug','crema','pequeño',3.6,'M'),
 ('Jessy','gato','Albino','blanco','grande',1.2,'H'),
 ('Bosnia','gato','Angora','naranja','mediano',1.4,'M'),
 ('Emma','perro','Chow-Chow','cafe','grande',5.5,'H'),
 ('Mica','gato','Angora','naranja','mediano',1.0,'H');
create table servicio (
  codServicio smallint primary key not null,
  tipoServicio varchar(30) not null,
  precio float not null,
  descripcion varchar(100)
  );
  insert into servicio values
  (1,'consulta general',50,'El animal recibe un diagnostico en que estado se encuentra'),
  (2,'vacunacion primeriza',85,'La vacunacion se dara para animales primerizos'),
  (3,'esterilizacion canina',120,'La esterilizacion es con tecnica spacy para canes'),
  (4,'esterilizacion felinos',95,'La esterilizacion es con tecnica spacy para felinos'),
  (5,'ecografias',280,'La ecografia ayuda a los animales a detectar todo males'),
  (6,'peluqueria',75,'La peluqueria contiene: Baños, corte de uñas, corte de pelos y perfumado');
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
('QR','Este pago se realiza mediante QR'),
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
('NIT','3340943017','Hurtado',1),
('NIT','3254175019','Mendoza',2),
('CI','5654898','Aligar',3),
('NIT','6754125917','Estrada',1),
('Vacio','0000','vacio',3);

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
(1,2,1,1,85,'pago de vacunacion'),
(1,1,2,1,50,'pago de consulta general'),
(1,5,1,1,280,'pago de ecografia'),
(2,1,2,4,50,'pago de consulta general'),
(2,3,2,4,120,'pago de esterilizacion canina'),
(3,1,2,2,50,'pago de consulta general'),
(3,4,2,2,95,'pago de esterilizacion felina'),
(3,2,1,7,120,'pago de esterilizacion canina'),
(4,1,2,8,50,'pago de consulta general'),
(4,4,2,8,95,'pago de esterilizacion felina');
select detalleFactura.codServicio,servicio.tipoServicio,servicio.precio,count(detalleFactura.codServicio) as Solicitados
from servicio, factura, detalleFactura
where servicio.codServicio=detalleFactura.codServicio and detalleFactura.codFactura=factura.codFactura 
group by detalleFactura.codServicio
order by count(detalleFactura.codServicio) desc;
select * from usuario;
select * from empleado;
select * from paciente;
select * from servicio;
select * from login;
select * from historial;
select * from cita;
select * from factura;
select * from detalleFactura;