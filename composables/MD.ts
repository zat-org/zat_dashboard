import { TAGS } from "~/models/MD";
import { useMyMDStore } from "~/store/MD";

export type TAG_ENTRY = {
  surround?: boolean;
  start?: boolean;
  add?: boolean;
  with?: string;
  body?: string;
};

export const TAGS_MAP: Record<TAGS, TAG_ENTRY> = {
  [TAGS.BOLD]: {
    surround: true,
    with: `**`,
  },
  [TAGS.ITALIC]: {
    surround: true,
    with: `*`,
  },
  [TAGS.UNDERLINE]: {
    surround: true,
    with: `++`,
  },
  [TAGS.STRIKETHROUGH]: {
    surround: true,
    with: `~~`,
  },
  [TAGS.HIGHLIGHT]: {
    surround: true,
    with: `==`,
  },
  [TAGS.SUBSCRIPT]: {
    surround: true,
    with: `~`,
  },
  [TAGS.SUPERSCRIPT]: {
    surround: true,
    with: `^`,
  },
  [TAGS.H1]: {
    start: true,
    with: `# `,
  },
  [TAGS.H2]: {
    start: true,
    with: `## `,
  },
  [TAGS.H3]: {
    start: true,
    with: `### `,
  },
  [TAGS.H4]: {
    start: true,
    with: `#### `,
  },
  [TAGS.H5]: {
    start: true,
    with: `##### `,
  },
  [TAGS.H6]: {
    start: true,
    with: `###### `,
  },
  [TAGS.BLOCKQUOTE]: {
    start: true,
    with: `> `,
  },
  [TAGS.LINK]: {
    add: true,
    body: `[title](https://www.example.com)`,
  },
  [TAGS.IMAGE]: {
    add: true,
    body: `![alt text](image.jpg)`,
  },
  [TAGS.TABLE]: {
    add: true,
    body: `
| Header | Header |
| ----------- | ----------- |
| Content | Content |
`,
  },
  [TAGS.FENCED_CODE_BLOCK]: {
    add: true,
    body: `
    \`\`\`language

    \`\`\``,
  },
  [TAGS.TEST]: {
    add: true,
    body: `<test name="enter name" icon="enter icon "> </test>`,
  },
  [TAGS.ACCORDION]: {
    add: true,
    body: `::Accordion
---
title: "قواعد اللعبة"
icon: "solar:book-broken"
---

 1.   قبل بدأ أي مباراة يجري الحكم قرعة لتحديد مكان جلوس كل فريق.
 1.  تبدأ المباراة بالمكابر و صاحب الورقة الأكبر هو من يبدأ بالتوزيع.
 1.   كتيب قوانين البلوت هو المرجع الرسمي للبطولة.
 1.   توضيح اللعب أو الغش يعتبر حالات تقديرية ترجع للحكم.
1.    يمنع تغيير مكان اللاعبين داخل الصكة.
1.    يسمح بتغيير اماكن اللاعبين بعد انتهاء الصكة.
 1.   قبل بدأ المباراة بــــ 15 دقيقة يقوم كابتن الفريق برفع أسماء اللاعبين المشاركين في الصكة الأولى من المباراة.

::`,
  }

};
export const useMD = () => {
  const replaceHighlightText = (tag: TAGS, HighlightText: string) => {
    const mdStore = useMyMDStore();
    let markdown = mdStore.MDTEXT;
    let cursor_position = mdStore.cursor_position;
    let tagEntry = TAGS_MAP[tag];
    let replacedText = "";
    if (tagEntry.surround) {
      replacedText = `${tagEntry.with}${HighlightText}${tagEntry.with}`;
    } else if (tagEntry.start) {
      replacedText = `${tagEntry.with}${HighlightText}`;
    }

    return (
      markdown.slice(0, cursor_position) +
      replacedText +
      markdown.slice(cursor_position + HighlightText.length)
    );
  };
  const addTag = (tag: TAGS) => {
    const mdStore = useMyMDStore();
    let markdown = mdStore.MDTEXT;
    let cursor_position = mdStore.cursor_position;

    let start_content = markdown.slice(0, cursor_position);
    let end_content = markdown.slice(cursor_position);
    let text = "";
    let tagEntry = TAGS_MAP[tag];
    if (tagEntry.surround) {
      text = `${tagEntry.with}${tag}${tagEntry.with}`;
    } else if (tagEntry.start) {
      text = `${tagEntry.with}${tag}`;
    } else if (tagEntry.add) {
      text = `${tagEntry.body}`;
    }
    return start_content+text+end_content
  };
  return { replaceHighlightText ,addTag};
};
