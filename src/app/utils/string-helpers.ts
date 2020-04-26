
export class StringHelpers {

    static ExtractSubstring(text: string, begin: string, end: string = null) {
        if (text.lastIndexOf(begin) === -1) {
            return null;
        }
        const pos = text.lastIndexOf(begin);
        const startAt = pos + begin.length;
        const endAt = end ? text.lastIndexOf(end) : text.length;
        if (startAt > endAt) {
            return null;
        }
        return text.substring(startAt, endAt);
    }

}
