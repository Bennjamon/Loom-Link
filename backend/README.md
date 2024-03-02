# Arquitectura Hexagonal + DDD

Esta arquitectura se basa en contextos, cada contexto se organiza bajo un regla de dependencias que va desde lo más externo (controladores) hasta lo más interno (fuentes de datos, entidades), de manera que las capas más externa pueden acceder a las capas más internas, pero nunca al revés, de manera que el flujo de una petición de datos se vería así:

```
controlador -> servicio -> repositorio -> fuente de datos
```

De esta manera, el controlador tiene acceso al servicio, repositorio o fuente de datos, pero estos últimos no tienen acceso al controlador.

## Estructura de los contextos

Cada contexto constará de 4 carpetas principales:

`controllers`: Se encargan de recibir las peticiones, procesarlas y enviar la respuesta correspondiente.

`services`: Procesan los datos recibidos desde los controladores y devuelven los datos/errores correspondientes.

`repositories`: Se encargan de interactuar con las fuentes de datos y convertir los datos crudos obtenidos en objetos de dominio.

`domain`: Aquí se modelan las entidades de dominio correspondientes a cada contexto.

También están la fuentes de datos, pero estas se obtienen a través de inyección de dependencias como instancias de fuentes de datos definidas en el contexto compartido.

## Carpetas principales

Las 2 carpetas principales del proyecto son:

`shared`: Este es el contexto compartido, contiene elementos que se usarán en otros contextos, tales como la entidad base, los errores de petición o las fuentes de datos.

`server`: Aquí está la configuración del servidor, la carga de controladores etc. Así como la configuración de inyección de dependencias.
