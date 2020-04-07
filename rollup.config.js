import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss-modules';
import pkg from './package.json';
import typescript from 'rollup-plugin-typescript2';
import autoprefixer from 'autoprefixer';
import { terser } from 'rollup-plugin-terser';
import replace from '@rollup/plugin-replace';

const isProduction = process.env.BUILD === 'production';

export default {
	input: 'src/index.ts',
	output: [
		{
			file: pkg.main,
			format: 'cjs',
			sourcemap: !isProduction,
		},
		{
			file: pkg.module,
			format: 'es',
			sourcemap: !isProduction,
		},
	],
	plugins: [
		peerDepsExternal(),
		postcss({
			extract: false,
			modules: true,
			plugins: [autoprefixer()],
			writeDefinitions: true,
		}),
		typescript({ useTsconfigDeclarationDir: true }),
		isProduction && replace({ 'data-testid': '' }),
		isProduction && terser(),
	],
	external: {
		react: 'react',
	},
};
