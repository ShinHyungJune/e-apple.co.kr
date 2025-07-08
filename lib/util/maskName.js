export default function maskName(name) {
    if (!name) return '';
    const len = name.length;
    if (len === 1) return '*';

    const visible = Math.ceil(len / 2); // 반올림해서 보이는 부분
    const masked = '*'.repeat(len - visible);

    return name.slice(0, visible) + masked;
}