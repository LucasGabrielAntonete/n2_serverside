export class VehicleController {
  constructor(useCases) {
    this.useCases = useCases;
  }

  create = async (req, res) => res.status(201).json(await this.useCases.create(req.body));
  list = async (req, res) => res.json(await this.useCases.list());
  findById = async (req, res) => res.json(await this.useCases.findById(req.params.id));
  findByModel = async (req, res) => res.json(await this.useCases.findByModel(req.query.modelo));
  update = async (req, res) => res.json(await this.useCases.update(req.params.id, req.body));
  delete = async (req, res) => res.json(await this.useCases.delete(req.params.id, req.query.definitiva === 'true'));
}
