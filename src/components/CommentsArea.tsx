import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'

// Interfaz adaptada a las columnas exactas de TB_Comments
interface Comentario {
  id: number
  UserName: string
  Comment: string
  Date: string
}

const EMOJIS_RAPIDOS = ['😊', '😂','😎','🥰','😲','🥳', '❤️','🔥','👍','✌️','👌','🙌', '🧑‍🔬','👩‍🔬','🍃','🧪']
const COMENTARIOS_POR_PAGINA = 3

export function CommentsArea() {
  const [autor, setAutor] = useState('')
  const [contenido, setContenido] = useState('')
  const [cargando, setCargando] = useState(false)
  const [mostrarEmojis, setMostrarEmojis] = useState(false)

  const [comentarios, setComentarios] = useState<Comentario[]>([])
  const [paginaActual, setPaginaActual] = useState(1)
  const [totalComentarios, setTotalComentarios] = useState(0)

  useEffect(() => {
    cargarComentarios(paginaActual)

    const canal = supabase
      .channel('cambios-comentarios')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'TB_Comments'
        },
        () => {
          if (paginaActual === 1) {
            cargarComentarios(1)
          } else {
            setTotalComentarios((prev) => prev + 1)
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(canal)
    }
  }, [paginaActual])

  async function cargarComentarios(pagina: number) {
    const desde = (pagina - 1) * COMENTARIOS_POR_PAGINA
    const hasta = desde + COMENTARIOS_POR_PAGINA - 1

    const { data, count, error } = await supabase
      .from('TB_Comments')
      .select('*', { count: 'exact' })
      .order('Date', { ascending: false })
      .range(desde, hasta)

    if (error) {
      console.error('Error cargando comentarios:', error.message)
    } else {
      setComentarios(data || [])
      setTotalComentarios(count || 0)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    // 1. Sanitizar y limpiar entradas
    const usernameClean = autor.replace(/<[^>]*>?/gm, '').trim()
    const commentClean = contenido.replace(/<[^>]*>?/gm, '').trim()

    // 2. Validaciones de presencia y longitud
    if (!usernameClean || !commentClean) {
        alert('Los campos no pueden estar vacíos o contener solo espacios.')
        return
    }

    if (usernameClean.length > 60 || commentClean.length > 200) {
        alert('El nombre o el comentario superan la longitud permitida.')
        return
    }

    setCargando(true)

    // 3. Inserción segura
    const { error } = await supabase
        .from('TB_Comments')
        .insert([{ UserName: usernameClean, Comment: commentClean }])

    setCargando(false)

    if (error) {
        console.error('Error Supabase:', error)
        alert('No se pudo publicar el comentario. Inténtalo más tarde.')
    } else {
        setAutor('')
        setContenido('')
        setMostrarEmojis(false)
        if (paginaActual !== 1) {
        setPaginaActual(1)
        }
    }
  }

  const agregarEmoji = (emoji: string) => {
    setContenido((prev) => prev + emoji)
    setMostrarEmojis(false)
  }

  const totalPaginas = Math.ceil(totalComentarios / COMENTARIOS_POR_PAGINA)

  return (
    <div style={estilos.contenedor}>
      <div style={estilos.container}>
        {/* Icono de burbuja con fondo suave */}
        <div style={estilos.iconWrapper}>
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#2563eb"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </div>

        {/* Contenido de texto */}
        <div>
          <h2 style={estilos.title}>Déjanos un comentario!!!</h2>
          <p style={estilos.subtitle}>Comparte tu opinión con nosotros</p>
        </div>
      </div>

      {/* Formulario estilizado */}
      <form onSubmit={handleSubmit} style={estilos.formulario}>
        {/* Campo 1: Nombre de usuario */}
        <div style={estilos.grupoFormulario}>
          <label htmlFor="autor" style={estilos.label}>
            Nombre Usuario:
          </label>
          <div style={{ flex: 1, display: 'flex', gap: '8px' }}>
            <input
                id="autor"
                type="text"
                placeholder="Ej. JoséPerez"
                value={autor}
                onChange={(e) => setAutor(e.target.value)}
                required
                style={estilos.input}
                maxLength={60}
                pattern="[A-Za-zá-ú0-9ü.,- ]{1,999}" autoComplete="off"
            />
            <div style={{ width: '42px', flexShrink: 0 }} />
          </div>
        </div>

        {/* Campo 2: Comentario y Botón Desplegable de Emojis */}
        <div style={{ ...estilos.grupoFormulario, alignItems: 'flex-start' }}>
          <label htmlFor="contenido" style={{ ...estilos.label, marginTop: '8px' }}>
            Comentario:
          </label>

          <div style={{ flex: 1, display: 'flex', gap: '8px', position: 'relative' }}>
            <textarea
              id="contenido"
              placeholder="Escribe lo que piensas..."
              value={contenido}
              onChange={(e) => setContenido(e.target.value)}
              rows={3}
              required
              style={estilos.textarea}
              maxLength={200} autoComplete="off"
            />

            {/* Contenedor relativo para el botón y lista desplegable */}
            <div style={{ position: 'relative' }}>
              <button
                type="button"
                onClick={() => setMostrarEmojis((prev) => !prev)}
                title="Seleccionar Emoji"
                style={estilos.botonDesplegableEmoji}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ display: 'block' }}
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                  <line x1="9" y1="9" x2="9.01" y2="9" strokeWidth="3" />
                  <line x1="15" y1="9" x2="15.01" y2="9" strokeWidth="3" />
                </svg>
              </button>

              {/* Lista desplegable de emojis */}
              {mostrarEmojis && (
                <div style={estilos.menuEmojis}>
                  {EMOJIS_RAPIDOS.map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => agregarEmoji(emoji)}
                      style={estilos.opcionEmoji}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Botón de envío */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '5px' }}>
          <button
            type="submit"
            disabled={cargando}
            style={{
              ...estilos.botonSubmit,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <span>{cargando ? 'Publicando...' : 'Publicar'}</span>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 2L11 13" />
              <path d="M22 2L15 22L11 13L2 9L22 2Z" />
            </svg>
          </button>
        </div>
      </form>

      <h3 style={estilos.titulo}>Comentarios💬({totalComentarios})</h3>

      {/* Lista de comentarios */}
      <div style={estilos.listaComentarios}>
        {comentarios.length === 0 ? (
          <p style={{ color: '#888', textAlign: 'center' }}>
            No hay comentarios aún. ¡Sé el primero en comentar!
          </p>
        ) : (
          comentarios.map((c) => (
            <div key={c.id} style={estilos.tarjetaComentario}>
              <div style={estilos.cabeceraComentario}>
                <strong style={estilos.nombreUsuario} title={`@${c.UserName}`}>
                    @{c.UserName}
                </strong>
                <small style={estilos.fechaComentario}>
                    {c.Date
                    ? new Date(c.Date).toLocaleString('es-ES', {
                        dateStyle: 'short',
                        timeStyle: 'short'
                        })
                    : 'Reciente'}
                </small>
              </div>
              <p style={estilos.textoComentario}>{c.Comment}</p>
            </div>
          ))
        )}
      </div>

      {/* Paginación */}
      {totalPaginas > 1 && (
        <div style={estilos.paginacion}>
          <button
            onClick={() => setPaginaActual((prev) => Math.max(prev - 1, 1))}
            disabled={paginaActual === 1}
            style={estilos.botonPaginacion}
          >
            &laquo; Anterior
          </button>
          <span style={{ fontSize: '0.9rem', color: '#555' }}>
            Página <strong>{paginaActual}</strong> de <strong>{totalPaginas}</strong>
          </span>
          <button
            onClick={() => setPaginaActual((prev) => Math.min(prev + 1, totalPaginas))}
            disabled={paginaActual === totalPaginas}
            style={estilos.botonPaginacion}
          >
            Siguiente &raquo;
          </button>
        </div>
      )}
    </div>
  )
}

// Objeto con los estilos
const estilos: Record<string, React.CSSProperties> = {
  contenedor: {
    maxWidth: '650px',
    margin: '30px auto',
    padding: '24px',
    borderRadius: '12px',
    backgroundColor: '#ffffff',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  },
  titulo: {
    marginTop: 0,
    marginBottom: '20px',
    color: '#1a1a1a',
    borderBottom: '2px solid #f0f0f0',
    paddingBottom: '10px'
  },
  formulario: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    marginBottom: '12px' // Se redujo de 30px a 12px para acercar la sección
  },
  grupoFormulario: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  label: {
    width: '100px',
    fontWeight: '600',
    fontSize: '0.9rem',
    color: '#444',
    textAlign: 'right'
  },
  input: {
    flex: 1,
    padding: '10px 12px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '0.95rem',
    outline: 'none'
  },
  textarea: {
    flex: 1,
    padding: '10px 12px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '0.95rem',
    resize: 'vertical',
    boxSizing: 'border-box',
    outline: 'none'
  },
  botonDesplegableEmoji: {
    backgroundColor: '#ffffff',
    border: '1px solid #ccc',
    borderRadius: '6px',
    padding: '8px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#000000',
    height: 'fit-content'
  },
  menuEmojis: {
    position: 'absolute',
    top: '100%',
    right: 0,
    marginTop: '6px',
    backgroundColor: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '4px',
    padding: '8px',
    zIndex: 10
  },
  opcionEmoji: {
    background: 'none',
    border: 'none',
    fontSize: '1.2rem',
    cursor: 'pointer',
    padding: '6px',
    borderRadius: '4px'
  },
  botonSubmit: {
    padding: '10px 20px',
    backgroundColor: '#2563eb',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontWeight: '600',
    cursor: 'pointer',
    fontSize: '0.9rem'
  },
  listaComentarios: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  tarjetaComentario: {
    padding: '14px',
    borderRadius: '8px',
    backgroundColor: '#f8fafc',
    border: '1px solid #e2e8f0'
  },
  cabeceraComentario: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px',
    gap: '12px', 
    minWidth: 0 
  },
  textoComentario: {
    margin: 0,
    color: '#334155',
    fontSize: '0.95rem',
    whiteSpace: 'pre-wrap',
    lineHeight: '1.4',
    wordBreak: 'break-word',    // Fuerza el salto de línea en palabras largas
    overflowWrap: 'anywhere'   // Rompe la cadena si supera el ancho del contenedor
  },
  paginacion: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '16px',
    marginTop: '24px'
  },
  botonPaginacion: {
    padding: '6px 14px',
    backgroundColor: '#f1f5f9',
    border: '1px solid #cbd5e1',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.85rem'
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    marginBottom: '24px',
    padding: '12px 16px',
    borderRadius: '12px',
    backgroundColor: '#f8fafc',
    borderLeft: '4px solid #2563eb',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.03)'
  },
  iconWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '48px',
    height: '48px',
    borderRadius: '10px',
    backgroundColor: '#eff6ff',
    flexShrink: 0
  },
  title: {
    margin: 0,
    fontSize: '1.25rem',
    fontWeight: 700,
    color: '#0f172a',
    letterSpacing: '-0.01em',
    lineHeight: 1.2
  },
  subtitle: {
    margin: '4px 0 0 0',
    fontSize: '0.875rem',
    color: '#64748b',
    fontWeight: 400
  },
  nombreUsuario: {
    color: '#222',
    fontSize: '0.95rem',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis', 
    minWidth: 0 
  },
  fechaComentario: {
    color: '#888',
    fontSize: '0.8rem',
    whiteSpace: 'nowrap', 
    flexShrink: 0 
  }
}