import { fontScale } from "../utils/scale";

export default{
    size:{
        tiny: fontScale(12),
        small: fontScale(14),
        medium: fontScale(16),
        big: fontScale(18),
        large: fontScale(20),
        xlarge: fontScale(24),
    },
    weight:{
        regular: '400' as const,
        medium:'500' as const,
        semibold: '600' as const,
        bold: '700' as const,
    }
}