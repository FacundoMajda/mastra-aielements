import { createTool } from "@mastra/core/tools";
import { z } from "zod";

const MEM0_API_URL = "https://api.mem0.ai";
const MEM0_API_KEY = process.env.MEM0_API_KEY;
const USER_ID = "faq";

const getHeaders = () => ({
  Authorization: `Token ${MEM0_API_KEY}`,
  "Content-Type": "application/json",
});

/**
 * 🟢 TOOL 1: AGREGAR MEMORIA (v1)
 * Guarda un hecho, preferencia o contexto relevante directamente en la memoria del sistema.
 * Úsalo para agregar información que quieras que el agente recuerde en interacciones futuras.
 *
 * Ejemplo de uso (few-shot):
 * ---------
 * ➤ input: { statement: "El usuario prefiere respuestas en español." }
 * ➤ output: { success: true, message: "Memoria guardada exitosamente" }
 *
 * ➤ input: { statement: "Su nombre es Ana y trabaja en marketing digital." }
 * ➤ output: { success: true, message: "Memoria guardada exitosamente" }
 * ---------
 */
const mem0AddTool = createTool({
  id: "mem0-add",
  description:
    'Almacena un hecho, preferencia o contexto en la memoria del sistema. Úsalo para que el agente recuerde información relevante sobre el usuario o la sesión.\n\nFew-shot:\n- statement: "Prefiero recibir recomendaciones de productividad en español."\n- statement: "Mi color favorito es el azul."\n- statement: "Tengo un perro llamado Max."',
  inputSchema: z.object({
    statement: z
      .string()
      .describe("Dato, preferencia o contexto que deseas guardar en memoria."),
  }),
  outputSchema: z.object({
    success: z.boolean(),
    message: z.string(),
  }),
  execute: async ({ context }) => {
    console.log(`\n💾 Guardando memoria: "${context.statement}"\n`);
    try {
      const response = await fetch(`${MEM0_API_URL}/v1/memories/`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({
          messages: [{ role: "user", content: context.statement }],
          user_id: USER_ID,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ Error:", errorText);
        return {
          success: false,
          message: `Error ${response.status}: ${errorText}`,
        };
      }

      const result = await response.json();
      console.log("✅ Resultado:", result);

      return {
        success: true,
        message: `Memoria guardada exitosamente`,
      };
    } catch (error) {
      console.error("❌ Error guardando:", error);
      return {
        success: false,
        message: `Error: ${error instanceof Error ? error.message : "desconocido"}`,
      };
    }
  },
});

/**
 * 🟡 TOOL 2: BUSCAR MEMORIA (v1 search)
 * Busca información semántica en la memoria guardada. Útil para recuperar hechos previos, preferencias o contexto relevante.
 *
 * Ejemplo de uso (few-shot):
 * ---------
 * ➤ input: { query: "¿Cuál es el nombre del usuario?" }
 * ➤ output: { memories: "1. Su nombre es Ana y trabaja en marketing digital.", count: 1 }
 *
 * ➤ input: { query: "¿Preferencias del usuario?" }
 * ➤ output: { memories: "1. Prefiero respuestas en español.", count: 1 }
 *
 * ➤ input: { query: "¿Mascotas?" }
 * ➤ output: { memories: "1. Tengo un perro llamado Max.", count: 1 }
 * ---------
 */
const mem0SearchTool = createTool({
  id: "mem0-search",
  description:
    'Realiza una búsqueda semántica en la memoria para encontrar hechos, preferencias o contexto relevante previamente guardado.\n\nFew-shot:\n- query: "¿Preferencias de idioma?"\n- query: "¿Mascotas del usuario?"\n- query: "¿Color favorito?"',
  inputSchema: z.object({
    query: z
      .string()
      .describe("Tema, pregunta o palabra clave a buscar en la memoria."),
  }),
  outputSchema: z.object({
    memories: z.string(),
    count: z.number(),
  }),
  execute: async ({ context }) => {
    console.log(`\n🔍 Buscando: "${context.query}"\n`);
    try {
      const requestBody = {
        query: context.query,
        user_id: USER_ID,
        limit: 5,
      };

      console.log("📤 Request:", JSON.stringify(requestBody, null, 2));

      const response = await fetch(`${MEM0_API_URL}/v1/memories/search/`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ Error:", errorText);
        return {
          memories: `Error: ${response.status} - ${errorText}`,
          count: 0,
        };
      }

      const data = await response.json();
      console.log("📥 Response:", JSON.stringify(data, null, 2));

      const memoriesArray = Array.isArray(data) ? data : data.results || [];

      if (memoriesArray.length === 0) {
        return {
          memories: "No se encontraron memorias relevantes.",
          count: 0,
        };
      }

      const memoriesText = memoriesArray
        .map(
          (mem: any, idx: number) =>
            `${idx + 1}. ${mem.memory || mem.data || mem.content}`
        )
        .join("\n\n");

      return {
        memories: memoriesText,
        count: memoriesArray.length,
      };
    } catch (error) {
      console.error("❌ Error buscando:", error);
      return {
        memories: `Error: ${error instanceof Error ? error.message : "desconocido"}`,
        count: 0,
      };
    }
  },
});

/**
 * 🟣 TOOL 3: OBTENER TODAS LAS MEMORIAS (v2)
 * Recupera el listado completo de memorias asociadas al usuario actual, mostrando contexto acumulado y metadatos almacenados.
 *
 * Ejemplo de uso (few-shot):
 * ---------
 * ➤ input: {}
 * ➤ output: { memories: "1. Prefiero respuestas en español.\n2. Tengo un perro llamado Max. | Metadata: {...}", count: 2 }
 * ---------
 */
const mem0GetAllTool = createTool({
  id: "mem0-get-all",
  description:
    'Recupera todas las memorias guardadas para el usuario actual. Útil para revisar y visualizar el contexto acumulado.\n\nFew-shot:\n- input: {}\n- output: { memories: "1. Prefiero respuestas en español.\\n2. Tengo un perro llamado Max. | Metadata: {...}", count: 2 }',
  inputSchema: z.object({}),
  outputSchema: z.object({
    memories: z.string(),
    count: z.number(),
  }),
  execute: async () => {
    console.log(
      `\n📋 Obteniendo todas las memorias para user_id: ${USER_ID}\n`
    );

    try {
      const requestBody = {
        filters: {
          user_id: USER_ID,
        },
        page: 1,
        page_size: 100,
      };

      console.log("📤 Request:", JSON.stringify(requestBody, null, 2));

      const response = await fetch(`${MEM0_API_URL}/v2/memories/`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ Error:", errorText);
        return {
          memories: `Error: ${response.status} - ${errorText}`,
          count: 0,
        };
      }

      const data = await response.json();
      console.log("📥 Response:", JSON.stringify(data, null, 2));

      const memoriesArray = Array.isArray(data) ? data : [];

      if (memoriesArray.length === 0) {
        return {
          memories: "No hay memorias guardadas aún.",
          count: 0,
        };
      }

      const memoriesText = memoriesArray
        .map((mem: any, idx: number) => {
          const memoryText = mem.memory || mem.data || mem.content;
          const metadata = mem.metadata
            ? ` | Metadata: ${JSON.stringify(mem.metadata)}`
            : "";
          return `${idx + 1}. ${memoryText}${metadata}`;
        })
        .join("\n\n");

      return {
        memories: memoriesText,
        count: memoriesArray.length,
      };
    } catch (error) {
      console.error("❌ Error obteniendo memorias:", error);
      return {
        memories: `Error: ${error instanceof Error ? error.message : "desconocido"}`,
        count: 0,
      };
    }
  },
});

export { mem0AddTool, mem0SearchTool, mem0GetAllTool };
