import { PROFILE_INFO } from '../data/links';

export function downloadVCard() {
  const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${PROFILE_INFO.fullName}
N:Michel;Fonlon;Hari;;
NICKNAME:${PROFILE_INFO.brandName}
TITLE:${PROFILE_INFO.tagline}
TEL;TYPE=CELL,VOICE:${PROFILE_INFO.phone}
URL:${PROFILE_INFO.profileDocUrl}
NOTE:Writer, Storyteller & Creative Strategist. WhatsApp: ${PROFILE_INFO.whatsappUrl} | Instagram: @micwrites_official
ADR;TYPE=HOME:;;Cameroon;;;;
END:VCARD`;

  const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'Fonlon_Hari_Michel_MicWrites.vcf');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
