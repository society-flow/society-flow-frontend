const pathToSlug = (path) => {
	return path.split('/').slice(-1)[0].split('.json')[0];
};

const moduleToData = (path, module) => {
	return {
		...module,
		slug: module?.slug || pathToSlug(path)
	};
};

const serializeModules = async (modules) => {
	const res = [];
	for (const path in modules) {
		const data = await modules[path]().then((mod) => {
			return moduleToData(path, mod);
		});
		res.push(data);
	}
	return res;
};

const getPages = () => {
	const modules = import.meta.glob('/src/content/pages/*.json', {
		import: 'default'
	});
	return Promise.resolve(serializeModules(modules));
};
const getPage = async (slug) => {
	const module = await import(`/src/content/pages/${slug}.json`);
	return moduleToData(slug, module.default);
};

const getBlogs = () => {
	const modules = import.meta.glob('/src/content/blogs/*.json', {
		import: 'default'
	});
	return Promise.resolve(serializeModules(modules));
};
const getBlog = async (slug) => {
	const module = await import(`/src/content/blogs/${slug}.json`);
	return moduleToData(slug, module.default);
};

export { getBlog, getBlogs, getPage, getPages };
