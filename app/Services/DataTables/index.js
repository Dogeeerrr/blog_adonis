class DatabaseServices {
  constructor(queryBuilder, params) {
    this.queryBuilder = queryBuilder
    this.params = params;
  }

  async result() {
    const {
      order = null,
      length = 10,
      start = 1,
      columns = [],
      search = { value: null }
    } = this.params;

    const query = this.queryBuilder.clone();

    if (search.value) {
      columns.forEach((column) => {
        if (column.searchable !== 'true') {
          return;
        }
        query.orWhereRaw(`LOWER(${column.name}) like ?`, [`%${search.value.toLowerCase()}%`])
      });
    }

    if (order) {
      query.orderBy(
        columns[order[0].column].data,
        order[0].dir,
      )
    }

    const total = await query.clone().getCount();
    const list = await query.offset(start).limit(length);
    return {
      recordsTotal: total,
      recordsFiltered: list.length,
      data: list,
    }
  }
}

module.exports = DatabaseServices;
