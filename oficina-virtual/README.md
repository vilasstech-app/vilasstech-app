# VILASSTECH Oficina Virtual

Fase 1: prospección comercial y revisión humana de correos. No modifica el administrador existente ni sus respaldos.

## Flujo
1. Buscar empresas panameñas mediante fuentes públicas autorizadas.
2. Registrar empresa, sector, ubicación, correo comercial público, URL de fuente y fecha de verificación.
3. Preparar una propuesta personalizada basada en hechos verificables, sin afirmar necesidades no confirmadas.
4. Revisar y aprobar individualmente antes de enviar mediante Gmail.
5. Registrar estado, respuesta, seguimiento y exclusiones de contacto.

## Arquitectura propuesta
Interfaz independiente; Google Auth y colección Firestore separada con reglas de propietario verificadas antes de habilitar acceso. Backend programado mediante Apps Script u otro servicio autorizado. Credenciales de búsqueda e IA únicamente en servidor, nunca en GitHub Pages. No enviar mensajes automáticamente en fase 1. Respetar bajas, evitar duplicados y limitar volumen. No almacenar datos reales ni secretos en este repositorio público.

## Estado
Diseño inicial. Pendientes: interfaz, reglas, autorización de Gmail, proveedor de búsqueda e IA, presupuesto y pruebas. No hay tareas programadas ni envíos activos.
