import db from '../database/db.js';

export const selectDisciplinas = async (page, limit) => { 
  const offset = (page - 1) * limit;
  const result = await db.query`SELECT * FROM Disciplinas ORDER BY ID OFFSET ${Number(offset)} ROWS
    FETCH NEXT ${Number(limit)} ROWS ONLY`;
  
  return result.recordset;
};



export const selectDisciplinasById = async (id) => {
  const result = await db.query`SELECT * FROM Disciplinas WHERE ID = ${id}`;
  return result.recordset[0];
};

// Selecionar disciplinas com base no nome, com paginação
export const selectDisciplinasByNome = async (nome, page, limit) => {
  const offset = (page - 1) * limit;
  const result = await db.query`SELECT * FROM Disciplinas WHERE UPPER(Nome) 
  LIKE UPPER(${`%${nome}%`}) ORDER BY ID OFFSET ${Number(offset)} ROWS
    FETCH NEXT ${Number(limit)} ROWS ONLY`;
  return result.recordset;
};

// Inserir uma nova disciplina
export const insertDisciplina = async (disciplina) => {
  const result = await db.query`
    INSERT INTO Disciplinas (Nome, ProfessorID) VALUES (${disciplina.nome}, ${disciplina.professorId})
  `;
  return result.recordset;
};

// Atualizar uma disciplina pelo ID
export const updateDisciplina = async (id, disciplina) => {
  const result = await db.query`
    UPDATE Disciplinas SET Nome = ${disciplina.nome}, ProfessorID = ${disciplina.professorId} WHERE ID = ${id}
  `;
  return result.recordset;
};

// Deletar uma disciplina pelo ID
export const deleteDisciplina = async (id) => {
  const result = await db.query`
    DELETE FROM Disciplinas WHERE ID = ${id}
  `;
  return result.recordset;
};