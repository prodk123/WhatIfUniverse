export interface KeywordLink {
  keyword: string;
  url: string;
}

export const SITE_KEYWORDS: KeywordLink[] = [
  { keyword: 'SIP', url: '/simulator/start-sip-at-20' },
  { keyword: 'Compound Interest', url: '/category/money' },
  { keyword: 'Opportunity Cost', url: '/simulator/drop-out' },
  { keyword: 'Mutual Fund', url: '/simulator/15-15-15-rule' },
  { keyword: 'Index Fund', url: '/simulator/15-15-15-rule' },
  { keyword: 'Master\'s Degree', url: '/guides/how-to-calculate-masters-roi' },
  { keyword: 'MBA', url: '/simulator/get-mba' },
  { keyword: 'Doctor', url: '/simulator/medical-school' },
  { keyword: 'Lawyer', url: '/simulator/law-school' },
  { keyword: '15x15x15 Rule', url: '/simulator/15-15-15-rule' },
  { keyword: 'Tax Bracket', url: '/category/money' },
];

/**
 * Automatically injects internal SEO links into markdown text.
 * SEO Best Practice: Only link the FIRST occurrence of a keyword on a page.
 * Safely avoids modifying existing markdown links or embeds.
 */
export function autoLinkText(text: string, keywords = SITE_KEYWORDS): string {
  if (!text) return text;
  
  // Sort keywords by length descending so longer phrases match before shorter ones
  const sortedKeywords = [...keywords].sort((a, b) => b.keyword.length - a.keyword.length);
  
  const placeholders: string[] = [];
  const usedKeywords = new Set<string>();

  // Split the text by existing markdown links to avoid corrupting them
  // This regex captures [text](url) and keeps it in the parts array
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);

  const processedParts = parts.map(part => {
    // If this part is already a markdown link, leave it untouched
    if (part.startsWith('[') && part.endsWith(')')) return part;
    
    let processed = part;
    
    sortedKeywords.forEach(kw => {
      // Only link a keyword once per document for SEO best practices
      if (usedKeywords.has(kw.keyword)) return;
      
      const escaped = kw.keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`\\b(${escaped})\\b`, 'i');
      
      const match = processed.match(regex);
      if (match) {
        usedKeywords.add(kw.keyword);
        const originalText = match[1]; // Preserve original casing
        const placeholder = `__AUTOLINK_${placeholders.length}__`;
        
        // Store the final markdown link
        placeholders.push(`[${originalText}](${kw.url})`);
        
        // Replace the word with a placeholder in the text
        processed = processed.replace(regex, placeholder);
      }
    });
    
    return processed;
  });

  let finalText = processedParts.join('');
  
  // Restore all placeholders with their actual markdown links
  placeholders.forEach((replacement, i) => {
    const placeholderRegex = new RegExp(`__AUTOLINK_${i}__`, 'g');
    finalText = finalText.replace(placeholderRegex, replacement);
  });

  return finalText;
}
