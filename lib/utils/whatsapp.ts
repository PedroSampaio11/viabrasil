import { WHATSAPP_NUMBER } from "@/lib/site-config"

/**
 * Gera a URL do WhatsApp com mensagem pré-preenchida.
 * Uso: links "Fale conosco", "Solicitar contato" em anúncios, etc.
 */
export function getWhatsAppUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}
