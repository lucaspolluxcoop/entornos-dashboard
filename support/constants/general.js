export const BOOLEAN_OPTIONS = [
    { label: 'No', value: 'N' },
    { label: 'Si', value: 'S' },
];

export const ROLES = {
    SUDO: 1,
    ADMIN: 2,
    COLEGIO_CI: 3,
    CORREDOR_INMOBILIARIO: 4,
    LOCADOR: 5,
    LOCATARIO: 6,
    GARANTE: 7
};

export const PROPERTY_SERVICES = {
    ELECTRICIDAD: 'electricidad',
    GAS: 'gas',
    OTROS: 'otros'
}

export const CONTRACT_TYPES = {
    LOCACION_PERMANENTE: 1,
    LOCACION_TEMPORARIA: 2,
    COMODATO: 3,
    ARRENDAMIENTO: 4,
    ACCIDENTAL_DE_ARRENDAMIENTO: 5,
    APARCERIA: 6
}

export const WARRANTY_TYPES = {
    TITULO_DE_PROPIEDAD_INMUEBLE: 1,
    AVAL_BANCARIO: 2,
    SEGURO_DE_CAUCION_PARA_ALQUILERES: 3,
    GARANTIA_PERSONAL_DEL_LOCATARIO: 4,
    GARANTIA_DE_FIANZA: 5
}

export const EXTINTION_REASONS_WITH_LABELS = [
    { value: 'VENCIMIENTO_PLAZO_LOCATIVO', label: 'Vencimiento del plazo locativo' },
    { value: 'RESCINCION_CONTRATO_ACUERDO_PARTES', label: 'Rescinción del contrato por acuerdo de partes' },
    { value: 'RESCINCION_CONTRATO_DERECHO_LOCATARIO', label: 'Rescinción del contrato por ejercicio del derecho del locatario' },
    { value: 'GESTION_DESOCUPACIÓN', label: 'Gestiones para obtener la desocupación' },
    { value: 'DESALOJO_JUDICIAL', label: 'Desalojo Judicial' },
    { value: 'FALLECIMIENTO_LOCATARIO', label: 'Fallecimiento del locatario' },
    { value: 'INCUMPLIMIENTO_LOCADOR', label: 'Incumplimiento del locador' },
    { value: 'VENTA_INMUEBLE', label: 'Venta del inmueble alocado' },
    { value: 'OTRO', label: 'Otro motivo' }
]

export const EXTINTION_REASONS = {
    VENCIMIENTO_PLAZO_LOCATIVO: 'VENCIMIENTO_PLAZO_LOCATIVO',
    RESCINCION_CONTRATO_ACUERDO_PARTES: 'RESCINCION_CONTRATO_ACUERDO_PARTES',
    RESCINCION_CONTRATO_DERECHO_LOCATARIO: 'RESCINCION_CONTRATO_DERECHO_LOCATARIO',
    GESTION_DESOCUPACIÓN: 'GESTION_DESOCUPACIÓN',
    DESALOJO_JUDICIAL: 'DESALOJO_JUDICIAL',
    FALLECIMIENTO_LOCATARIO: 'FALLECIMIENTO_LOCATARIO',
    INCUMPLIMIENTO_LOCADOR: 'INCUMPLIMIENTO_LOCADOR',
    VENTA_INMUEBLE: 'VENTA_INMUEBLE',
    OTRO: 'OTRO'
}

export const ECONOMIC_ACTIVITY_TYPES = {
    RELACION_DE_DEPENDENCIA: 1,
    ACTIVIDAD_INDEPENDIENTE: 2,
    JUBILADO_PENSIONADO: 3,
    SIN_ACTIVIDAD_DECLARADA: 4,
    OTRA: 5
}

export const USER_STATES = {
    CREADO: 1,
    VERIFICADO: 2,
    INHABILITADO: 3,
}
