export class FormatProductionTime {


    static parseDurationToHours(value: string | null): number {
        if (!value) {
            return 0;
        }

        const normalized =
            value.toLowerCase().trim();

        const days =
            this.extract(normalized, /(\d+)d/);

        const hours =
            this.extract(normalized, /(\d+)h/);

        const minutes =
            this.extract(normalized, /(\d+)m/);

        const seconds =
            this.extract(normalized, /(\d+)s/);

        return (
            (days * 24)
            + hours
            + (minutes / 60)
            + (seconds / 3600)
        );
    }

    private static extract(
        value: string,
        regex: RegExp
    ): number {

        const match =
            value.match(regex);

        return match
            ? Number(match[1])
            : 0;
    }

    static formatHoursToDuration(
        value: number | null
    ): string {

        if (!value || value <= 0) {
            return '';
        }

        let totalSeconds =
            Math.round(value * 3600);

        const days =
            Math.floor(totalSeconds / 86400);

        totalSeconds %= 86400;

        const hours =
            Math.floor(totalSeconds / 3600);

        totalSeconds %= 3600;

        const minutes =
            Math.floor(totalSeconds / 60);

        const seconds =
            totalSeconds % 60;

        const parts: string[] = [];

        if (days > 0) {
            parts.push(`${days}d`);
        }

        if (hours > 0) {
            parts.push(`${hours}h`);
        }

        if (minutes > 0) {
            parts.push(`${minutes}m`);
        }

        if (seconds > 0) {
            parts.push(`${seconds}s`);
        }

        return parts.join('');
    }

}